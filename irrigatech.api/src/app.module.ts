import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ControladorModule } from './modules/controlador/controlador.module';
import { MqttModule } from './modules/mqtt/mqtt.module';
import { ConfigModule } from '@nestjs/config';
import { SocketModule } from './modules/socket/socket.module';
import { SocketService } from './modules/socket/socket.service';
import { ValvulasModule } from './modules/valvulas/valvulas.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, 
      envFilePath: process.env.NODE_ENV === 'production' ? 'environments/.env.production' : 'environments/.env.development'
    }),
    ControladorModule, MqttModule, SocketModule, ValvulasModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
