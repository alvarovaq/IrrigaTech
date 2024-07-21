#pragma once

#include <PubSubClient.h>
#include <vector>
#include <WiFi.h>

class MqttController
{
public:
  MqttController(const char* _id);
  ~MqttController() = default;

  void connect(const char* address, uint16_t port, MQTT_CALLBACK_SIGNATURE);
  void subscribe(const char* topic);
  void publish(const char* topic, const char* message);
  void loop(unsigned long now);

private:
  WiFiClient m_wifi;
  PubSubClient m_client;
  const char* m_id;
  std::vector<const char*> m_vcTopics;
  unsigned long m_timer;

  bool _reconnect();

};