import { Module } from '@nestjs/common';
import { ControladorService } from './controlador.service';
import { ControladorController } from './controlador.controller';
import { ValvulasModule } from '../valvulas/valvulas.module';
import { ConnectorModule } from '../connector/connector.module';

@Module({
  imports: [ConnectorModule, ValvulasModule],
  controllers: [ControladorController],
  providers: [ControladorService],
})
export class ControladorModule {}
