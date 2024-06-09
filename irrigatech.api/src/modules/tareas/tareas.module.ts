import { Module } from '@nestjs/common';
import { TareasService } from './tareas.service';
import { TareasController } from './tareas.controller';
import { MqttModule } from '../mqtt/mqtt.module';

@Module({
  imports: [MqttModule],
  providers: [TareasService],
  controllers: [TareasController],
  exports: [TareasService]
})
export class TareasModule {}
