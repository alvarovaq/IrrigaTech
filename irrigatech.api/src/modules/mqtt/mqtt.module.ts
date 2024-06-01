import { Module } from '@nestjs/common';
import { MqttService } from './mqtt.service';
import { ValvulasModule } from '../valvulas/valvulas.module';

@Module({
  imports: [ValvulasModule],
  providers: [MqttService],
  exports: [MqttService]
})
export class MqttModule {}
