import { Injectable, OnModuleInit } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { info } from 'ps-logger';
import { ValvulasService } from '../valvulas/valvulas.service';
import {
    WebSocketGateway,
    WebSocketServer,
    OnGatewayInit,
    OnGatewayConnection,
    OnGatewayDisconnect
} from '@nestjs/websockets';
import { Valvula } from 'src/interfaces/valvula.interface';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
@Injectable()
export class SocketService implements OnModuleInit, OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor (private valvulasService: ValvulasService) {}

  onModuleInit() {
    this.valvulasService.OnUpdate().subscribe((valvulas: Valvula[]) => {
      this.sendMessage('updateStatus', valvulas);
    });
  }

  afterInit(server: Server) {
    info('WebSocket initialized');
  }

  handleConnection(client: Socket, ...args: any[]) {
    info(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    info(`Client disconnected: ${client.id}`);
  }

  sendMessage(ev: string, msg: any)
  {
    info(`Enviando mensaje: ${msg}`);
    this.server.emit(ev, msg);
  }
}
