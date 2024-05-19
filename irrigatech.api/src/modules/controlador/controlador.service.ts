import { Injectable, Inject } from '@nestjs/common';
import { MqttService } from '../mqtt/mqtt.service';

@Injectable()
export class ControladorService {

  constructor (
    @Inject(MqttService) private readonly mqttService : MqttService
  ) {}

  setStatus(status: string) {
    this.mqttService.publish("irrigatech/push_status", status);
    return true;
  }
}
