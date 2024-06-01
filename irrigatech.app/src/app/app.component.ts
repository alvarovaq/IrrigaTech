import { Component, OnInit } from '@angular/core';
import { ControladorService } from './core/services/controlador.service';
import { ValvulasService } from './core/services/valvulas.service';
import { ReceiverService } from './core/services/receiver.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  status: boolean = false;

  constructor (
    private readonly controladorService : ControladorService,
    private valvulasService: ValvulasService,
    private receiverService: ReceiverService
  ) {}

  ngOnInit(): void {
    this.receiverService.init();
    this.valvulasService.OnUpdate().subscribe((open: boolean) => {
      this.status = open;
    });    
  }

  setStatus(status : boolean) : void
  {
    this.controladorService.setStatus(status)
    .subscribe(
      res => {
      },
      err => {
        console.log(err);
      }
    );
  }
}
