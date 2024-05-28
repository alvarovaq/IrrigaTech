#ifndef MQTTCONTROLLER_H
#define MQTTCONTROLLER_H

#include <PubSubClient.h>
#include <vector>

class MqttController
{
private:
  WiFiClient espClient;
  PubSubClient client;
  const char* id;
  std::vector<const char*> subscribed_topics;

public:
  MqttController(const char* _id)
    : client(espClient)
    , id(_id)
  {
  }

  ~MqttController() = default;

  void connect(const char* address, uint16_t port, MQTT_CALLBACK_SIGNATURE)
  {
    client.setServer(address, port);
    client.setCallback(callback);
    reconnect();
  }

  void subscribe(const char* topic)
  {
    if (client.subscribe(topic))
      subscribed_topics.push_back(topic);
  }

  void publish(const char* topic, const char* message)
  {
    client.publish(topic, message);
  }

  void loop()
  {
    if (!client.connected())
      reconnect();
    client.loop();
  }

private:
  void reconnect()
  {
    while (!client.connected())
    {
      Serial.print("Conectando al broker MQTT...");
      if (client.connect(id))
      {
        Serial.println("Conectado");
        for (const char* topic : subscribed_topics)
            client.subscribe(topic);
      }
      else
      {
        Serial.print("Fallo, rc=");
        Serial.print(client.state());
        Serial.println(" Intentando de nuevo en 5 segundos");
        delay(5000);
      }
    }
  }

};

#endif