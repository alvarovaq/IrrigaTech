import { Module } from '@nestjs/common';
import { ControladorService } from './controlador.service';
import { ControladorController } from './controlador.controller';
import { MqttModule } from '../mqtt/mqtt.module';
import { ValvulasModule } from '../valvulas/valvulas.module';

@Module({
  imports: [MqttModule, ValvulasModule],
  controllers: [ControladorController],
  providers: [ControladorService],
})
export class ControladorModule {}