import { Module } from '@nestjs/common';
import { ConnectorService } from './connector.service';
import { MqttModule } from '../mqtt/mqtt.module';
import { ValvulasModule } from '../valvulas/valvulas.module';

@Module({
    imports: [MqttModule, ValvulasModule],
    providers: [ConnectorService],
    exports: [ConnectorService]
})
export class ConnectorModule {}
