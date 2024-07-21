#include "MqttController.h"

#define TIMEOUT 5000

MqttController::MqttController(const char* id)
  : m_client(m_wifi)
  , m_id(id)
  , m_timer(0)
{
}

void MqttController::connect(const char* address, uint16_t port, MQTT_CALLBACK_SIGNATURE)
{
  m_client.setServer(address, port);
  m_client.setCallback(callback);

  while (!m_client.connected())
  {
    if (!_reconnect())
    {
      Serial.println(" Intentando de nuevo en 5 segundos");
      delay(5000);
    }
  }
}

void MqttController::subscribe(const char* topic)
{
  if (m_client.subscribe(topic))
    m_vcTopics.push_back(topic);
}

void MqttController::publish(const char* topic, const char* message)
{
  if (m_client.publish(topic, message))
    Serial.print("Mensaje enviado [");
    Serial.print(topic);
    Serial.print("]: ");
    Serial.println(message);
}

void MqttController::loop(unsigned long now)
{
  if (!m_client.connected() && now - m_timer >= TIMEOUT)
  {
    _reconnect();
    m_timer = now;
  }
  m_client.loop();
}

bool MqttController::_reconnect()
{
  Serial.println("Conectando al broker MQTT...");
  if (m_client.connect(m_id))
  {
    Serial.println("Conectado");
    for (const char* topic : m_vcTopics)
        m_client.subscribe(topic);
    return true;
  }
  else
  {
    Serial.print("Fallo, rc=");
    Serial.print(m_client.state());
    return false;
  }
}