import { Injectable, OnModuleInit } from '@nestjs/common';
import { connect } from 'mqtt';
import { error, info } from 'ps-logger';

@Injectable()
export class MqttService implements OnModuleInit {
    private mqttClient;

    onModuleInit() {
        const host = process.env.MQTT_BROKER_ADDRESS;
        const port = process.env.MQTT_BROKER_PORT;
        const clientId = "SERVER";

        const connectUrl = `mqtt://${host}:${port}`;
        const topic = "irrigatech/push_status";

        this.mqttClient = connect(connectUrl, {
            clientId,
            clean: true,
            connectTimeout: 4000,
            reconnectPeriod: 1000,            
        });

        this.mqttClient.on("connect", function () {
            info("Connected to CludMQTT");
        });

        this.mqttClient.on("error", function () {
            error("Error in connecting to CloudMQTT");
        });
    }

    publish(topic: string, payload: string) : string {
        info(`Publishing to ${topic}`);
        this.mqttClient.publish(topic, payload);
        return `Publishing to ${topic}`;
    }

}
