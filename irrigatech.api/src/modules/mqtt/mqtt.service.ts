import { Injectable, OnModuleInit } from '@nestjs/common';
import { connect } from 'mqtt';
import { error, info } from 'ps-logger';
import { ValvulasService } from '../valvulas/valvulas.service';

@Injectable()
export class MqttService implements OnModuleInit {
    private mqttClient;

    constructor (private valvulasService: ValvulasService) {}

    onModuleInit() {
        const host = process.env.MQTT_BROKER_ADDRESS;
        const port = process.env.MQTT_BROKER_PORT;
        const clientId = "SERVER";

        const connectUrl = `mqtt://${host}:${port}`;

        this.mqttClient = connect(connectUrl, {
            clientId,
            clean: true,
            connectTimeout: 4000,
            reconnectPeriod: 1000,            
        });

        this.mqttClient.on("connect", function () {
            info("Connected to CludMQTT");
            this.subscribe('irrigatech/pull_status');
        });

        this.mqttClient.on('message', (topic, message) => {
            info("Receive message: " + topic + ": " + message);
            if (topic == "irrigatech/pull_status")
            {
                if (message == "ON")
                    this.valvulasService.update(true);
                else if (message == "OFF")
                    this.valvulasService.update(false);
            }
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

    subscribe(topic: string) {
        info(`Subscribe to topic ${topic}`);
        const pattern = { cmd: 'subscribe', topic };
        return this.mqttClient.send(pattern, {});
    }

}
