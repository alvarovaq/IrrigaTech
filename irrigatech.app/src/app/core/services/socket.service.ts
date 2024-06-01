import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket: Socket;
  private readonly url: string = environment.apiUrl;

  constructor() {
    this.socket = io(this.url);
  }
  
  onMessage(ev: string): Observable<any> {
    return new Observable<any>(observer => {
      this.socket.on(ev, (message: any) => {
        observer.next(message);
      });
      
      return () => {
        this.socket.off(ev);
      };
    });
  }
  
  onConnect(): Observable<void> {
    return new Observable<void>(observer => {
      this.socket.on('connect', () => {
        observer.next();
      });
      
      return () => {
        this.socket.off('connect');
      };
    });
  }
  
  onDisconnect(): Observable<void> {
    return new Observable<void>(observer => {
      this.socket.on('disconnect', () => {
        observer.next();
      });
      
      return () => {
        this.socket.off('disconnect');
      };
    });
  }
}
