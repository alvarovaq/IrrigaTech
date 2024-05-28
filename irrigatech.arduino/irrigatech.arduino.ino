#include "WifiConnection.hpp"
#include "MqttController.hpp"
#include "config.h"
#include <time.h>
#include <climits>

#define TEMP_SENDSTATUS 60000

const int SignalPin = 2;
time_t tm_sendstatus = 0;

MqttController mqttCtrl("ESP32_1");

void setup() {
  pinMode(SignalPin, OUTPUT);
  Serial.begin(115200);
  setup_wifi(WIFI_SSID, WIFI_PASSWORD);
  mqttCtrl.connect(MQTT_BROKER_ADDRESS, MQTT_PORT, onMessageReceived);
  mqttCtrl.subscribe("irrigatech/push_status");
}

void loop() {
  mqttCtrl.loop();

  auto now = millis();
  auto diff = now >= tm_sendstatus ? now - tm_sendstatus : ULLONG_MAX - tm_sendstatus + now;
  if (diff > TEMP_SENDSTATUS)
  {
    tm_sendstatus = now;
    int val = digitalRead(SignalPin);
    mqttCtrl.publish("irrigatech/pull_status", val == HIGH ? "ON" : "OFF");
  }
}

void onMessageReceived(char* topic, byte* payload, unsigned int length) {
  Serial.print("Mensaje recibido [");
  Serial.print(topic);
  Serial.print("]: ");
  String message;

  for (int i = 0; i < length; i++) {
    message += (char)payload[i];
  }

  Serial.println(message);

  if (message == "ON") {
    digitalWrite(SignalPin, HIGH);
  } else if (message == "OFF") {
    digitalWrite(SignalPin, LOW);
  }
}
