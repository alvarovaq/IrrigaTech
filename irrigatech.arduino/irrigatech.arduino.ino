#include "WifiConnection.hpp"
#include "MqttController.hpp"
#include "config.h"
#include <time.h>
#include <climits>
#include "ValvulasController.hpp"

#define TEMP_SENDSTATUS 60000

const int SignalPin = 2;
time_t tm_sendstatus = 0;

MqttController mqttCtrl("ESP32_1");
ValvulasController valvulasCtrl;

void setup() {
  pinMode(SignalPin, OUTPUT);
  Serial.begin(115200);
  setup_wifi(WIFI_SSID, WIFI_PASSWORD);
  mqttCtrl.connect(MQTT_BROKER_ADDRESS, MQTT_PORT, onMessageReceived);
  mqttCtrl.subscribe("irrigatech/push_status");
  valvulasCtrl.init();
}

void loop() {
  mqttCtrl.loop();

  auto now = millis();
  auto diff = now >= tm_sendstatus ? now - tm_sendstatus : ULLONG_MAX - tm_sendstatus + now;
  if (diff > TEMP_SENDSTATUS)
  {
    tm_sendstatus = now;
    String sValvulas = "";
    for (int i = 1; i <= 6; i++)
    {
      String value = valvulasCtrl.getStatus(i) ? "1" : "0";
      sValvulas += String(i) + ":" + value + ";";
    }
    mqttCtrl.publish("irrigatech/pull_status", sValvulas.c_str());
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

  String actValvulas;
  int index = -1;
  int from = 0;
  do {
    index = message.indexOf(';', from);
    String valv;
    if (index != -1)
      valv = message.substring(from, index);
    else
      valv = message.substring(from);

    int indexValv = valv.indexOf(':');
    if (indexValv != -1)
    {
      int id = valv.substring(0, indexValv).toInt();
      bool open = valv.substring(indexValv + 1) == "1";
      if (valvulasCtrl.getStatus(id) != open)
      {
        valvulasCtrl.setStatus(id, open);
        actValvulas += valv + ";";
      }
    }

    from = index + 1;
  } while (index != -1);

  if (actValvulas.length() > 0)
  {
    mqttCtrl.publish("irrigatech/pull_status", actValvulas.c_str());
  }
}
