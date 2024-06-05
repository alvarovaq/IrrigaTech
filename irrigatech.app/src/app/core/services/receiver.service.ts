import { Injectable } from '@angular/core';
import { SocketService } from './socket.service';
import { ValvulasService } from './valvulas.service';
import { Valvula } from '@core/interfaces/valvula.interface';
import { ControladorService } from './controlador.service';

@Injectable({
  providedIn: 'root'
})
export class ReceiverService {

  constructor(
    private socketService: SocketService,
    private valvulasService: ValvulasService,
    private controladorService: ControladorService
  ) {
  }

  init(): void
  {
    this.controladorService.getAllStatus().subscribe(
      (res: Valvula[]) => {
        console.log(res);
        this.valvulasService.update(res);
      }
    );

    this.socketService.onConnect().subscribe(() => {
      console.log('Connected to WebSocket server');
    });

    this.socketService.onDisconnect().subscribe(() => {
      console.log('Disconnected from WebSocket server');
    });
  
    this.socketService.onMessage('updateStatus').subscribe((valvulas: Valvula[]) => {
      this.valvulasService.update(valvulas);
    });
  }
}
