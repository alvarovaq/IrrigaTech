import { Component, OnInit } from '@angular/core';
import { ControladorService } from '@core/services/controlador.service';
import { ReceiverService } from '@core/services/receiver.service';
import { ValvulasService } from '@core/services/valvulas.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
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
