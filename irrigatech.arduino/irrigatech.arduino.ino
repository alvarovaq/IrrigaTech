#include <WiFi.h>
#include <PubSubClient.h>

#include "config.h"

const char* MQTT_CLIENT_NAME = "ESP32_1";
const char* MQTT_TOPIC = "irrigatech/push_status";

const int SignalPin = 2;

WiFiClient espClient;
PubSubClient client(espClient);

void setup_wifi() {
  delay(10);
  Serial.println();
  Serial.print("Conectando a ");
  Serial.println(SSID);

  WiFi.begin(SSID, PASSWORD);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("");
  Serial.println("WiFi conectado");
  Serial.println("Dirección IP: ");
  Serial.println(WiFi.localIP());
}

void callback(char* topic, byte* payload, unsigned int length) {
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

void reconnect() {
  while (!client.connected()) {
    Serial.print("Conectando al broker MQTT...");
    if (client.connect(MQTT_CLIENT_NAME)) {
      Serial.println("Conectado");
      client.subscribe(MQTT_TOPIC);
    } else {
      Serial.print("Fallo, rc=");
      Serial.print(client.state());
      Serial.println(" Intentando de nuevo en 5 segundos");
      delay(5000);
    }
  }
}

void setup() {
  pinMode(SignalPin, OUTPUT);
  Serial.begin(115200);
  setup_wifi();
  client.setServer(MQTT_BROKER_ADDRESS, MQTT_PORT);
  client.setCallback(callback);
}

void loop() {
  if (!client.connected()) {
    reconnect();
  }
  client.loop();
}
