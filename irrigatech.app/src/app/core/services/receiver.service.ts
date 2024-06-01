import { Injectable } from '@angular/core';
import { SocketService } from './socket.service';
import { ValvulasService } from './valvulas.service';

@Injectable({
  providedIn: 'root'
})
export class ReceiverService {

  constructor(
    private socketService: SocketService,
    private valvulasService: ValvulasService
  ) {
  }

  init(): void
  {
    this.socketService.onConnect().subscribe(() => {
      console.log('Connected to WebSocket server');
    });

    this.socketService.onDisconnect().subscribe(() => {
      console.log('Disconnected from WebSocket server');
    });
  
    this.socketService.onMessage('updateStatus').subscribe((open: boolean) => {
      this.valvulasService.update(open);
    });
  }
}
