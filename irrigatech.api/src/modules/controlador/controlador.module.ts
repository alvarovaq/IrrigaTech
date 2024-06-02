import { Module } from '@nestjs/common';
import { ControladorService } from './controlador.service';
import { ControladorController } from './controlador.controller';
import { ValvulasModule } from '../valvulas/valvulas.module';
import { MqttModule } from '../mqtt/mqtt.module';

@Module({
  imports: [MqttModule, ValvulasModule],
  controllers: [ControladorController],
  providers: [ControladorService],
})
export class ControladorModule {}
