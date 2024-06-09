import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ControladorModule } from './modules/controlador/controlador.module';
import { MqttModule } from './modules/mqtt/mqtt.module';
import { ConfigModule } from '@nestjs/config';
import { SocketModule } from './modules/socket/socket.module';
import { ValvulasModule } from './modules/valvulas/valvulas.module';
import { ProgramasModule } from './modules/programas/programas.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, 
      envFilePath: process.env.NODE_ENV === 'production' ? 'environments/.env.production' : 'environments/.env.development'
    }),
    MongooseModule.forRoot('mongodb://localhost:27017/irrigatech'),
    ScheduleModule.forRoot(),
    ControladorModule, MqttModule, SocketModule, ValvulasModule, ProgramasModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
