import { Injectable, Inject } from '@nestjs/common';
import { MqttService } from '../mqtt/mqtt.service';
import { ValvulasService } from '../valvulas/valvulas.service';

@Injectable()
export class ControladorService {

  constructor (
    private readonly mqttService : MqttService,
    private readonly valvulasService: ValvulasService
  ) {}

  setStatus(status: string) {
    this.mqttService.publish("irrigatech/push_status", status);
    return true;
  }

  getStatus() : boolean {
    const status = this.valvulasService.get();
    return status;
  }
}
