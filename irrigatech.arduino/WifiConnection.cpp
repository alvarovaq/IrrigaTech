#include "WifiConnection.h"

#define TIMEOUT 5000

WifiConnection::WifiConnection()
  : m_timer(0)
{
}

void WifiConnection::connect(const char* ssid, const char* password) {
  delay(10);
  Serial.println();
  Serial.print("Conectando a ");
  Serial.println(ssid);

  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("");
  Serial.println("WiFi conectado");
  Serial.println("Dirección IP: ");
  Serial.println(WiFi.localIP());
}

void WifiConnection::loop(unsigned long now)
{
  if ((WiFi.status() != WL_CONNECTED) && (now - m_timer >= TIMEOUT))
  {
    _reconnect();
    m_timer = now;
  }
}

void WifiConnection::_reconnect()
{
  Serial.println("Reconectando conexion Wifi...");
  WiFi.disconnect();
  WiFi.reconnect();

  if (WiFi.status() == WL_CONNECTED)
  {
    Serial.println("");
    Serial.println("WiFi conectado");
    Serial.println("Dirección IP: ");
    Serial.println(WiFi.localIP());
  }
}