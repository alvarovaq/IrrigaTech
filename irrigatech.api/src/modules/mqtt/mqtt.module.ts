import { Module } from '@nestjs/common';
import { MqttService } from './mqtt.service';
import { ConnectorService } from './connector.service';
import { ValvulasModule } from '../valvulas/valvulas.module';

@Module({
  imports: [ValvulasModule],
  providers: [MqttService, ConnectorService],
  exports: [ConnectorService]
})
export class MqttModule {}
