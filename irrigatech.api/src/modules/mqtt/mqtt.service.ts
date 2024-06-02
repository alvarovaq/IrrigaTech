import { Injectable, OnModuleInit } from '@nestjs/common';
import { connect } from 'mqtt';
import { error, info } from 'ps-logger';
import { ValvulasService } from '../valvulas/valvulas.service';
import { Valvula } from 'src/interfaces/valvula.interface';

@Injectable()
export class MqttService implements OnModuleInit {
    private mqttClient;

    constructor (
        private valvulasService: ValvulasService
    ) {}

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

        this.mqttClient.on('message', (topic: string, message: string) => {
            info("Receive message: " + topic + ": " + message);
            if (topic == "irrigatech/pull_status")
            {
                const valvulas: Valvula[] = this.parser(message.toString());
                this.valvulasService.update(valvulas);
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

    send(id: number, open: boolean) : void {
        this.publish('irrigatech/push_status', `${id}:${open ? '1' : '0'}`);
    }

    parser(msg: string) : Valvula[] {
        let valvulas: Valvula[] = [];
        const date = new Date();
        for (const valv of msg.split(';'))
        {
            const status = valv.split(':');
            if (status.length != 2)
                continue;
            const id: number = parseInt(status[0]);
            const open: boolean = status[1] == '1';
            const valvula: Valvula = { id, open, date };
            valvulas.push(valvula);
        }
        return valvulas;
    }

}
