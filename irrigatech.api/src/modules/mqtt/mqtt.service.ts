import { Injectable, OnModuleInit } from '@nestjs/common';
import { connect } from 'mqtt';
import { info } from 'ps-logger';
import { ValvulasService } from '../valvulas/valvulas.service';
import { Valvula } from 'src/interfaces/valvula.interface';
import { Observable } from 'rxjs';

@Injectable()
export class MqttService implements OnModuleInit {
    private mqttClient;

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
    }

    publish(topic: string, payload: string) : string {
        info(`Publishing to ${topic}`);
        this.mqttClient.publish(topic, payload);
        return `Publishing to ${topic}`;
    }

    subscribe(topic: string) {
        info(`Subscribe to topic ${topic}`);
        this.mqttClient.subscribe(topic);
    }

    OnConnect(): Observable<boolean> {
        return new Observable<boolean>(observer => {
            this.mqttClient.on('connect', () => {
                observer.next(true);
            });

            return () => {
                this.mqttClient.off('connect');
            };
        });
    }

    OnMessage(topic: string): Observable<string> {
        return new Observable<string>(observer => {
            this.mqttClient.on('message', (tp: string, message: string) => {
                if (tp == topic)
                    observer.next(message.toString());
            });

            return () => {
                this.mqttClient.off('message');
            };
        });
    }

    OnError(): Observable<boolean> {
        return new Observable<boolean>(observer => {
            this.mqttClient.on('error', () => {
                observer.next(true);
            });
        });
    }

}
