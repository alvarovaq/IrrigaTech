import { Injectable, OnModuleInit } from '@nestjs/common';
import { MqttService } from './mqtt.service';
import { info } from 'ps-logger';
import { Valvula } from 'src/interfaces/valvula.interface';
import { ValvulasService } from '../valvulas/valvulas.service';
import { error } from 'console';

@Injectable()
export class ConnectorService implements OnModuleInit {

    constructor (
        private mqttService : MqttService,
        private valvulasService: ValvulasService
    ) {}

    onModuleInit() {
        this.mqttService.OnConnect().subscribe((res) => {
            info("Connected to CludMQTT");
            this.mqttService.subscribe('irrigatech/pull_status');
        });

        this.mqttService.OnError().subscribe((res) => {
            error("Error in connecting to CloudMQTT");
        });

        this.mqttService.OnMessage('irrigatech/pull_status').subscribe((msg) => {
            const valvulas: Valvula[] = this.parser(msg);
            this.valvulasService.update(valvulas);
        });
    }

    send(id: number, open: boolean) : void {
        this.mqttService.publish('irrigatech/push_status', `${id}:${open ? '1' : '0'}`);
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
