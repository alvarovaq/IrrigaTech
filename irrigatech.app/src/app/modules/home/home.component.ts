import { Component, OnInit } from '@angular/core';
import { Valvula } from '@core/interfaces/valvula.interface';
import { ControladorService } from '@core/services/controlador.service';
import { ReceiverService } from '@core/services/receiver.service';
import { ValvulasService } from '@core/services/valvulas.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  valvulas: Valvula[] = [];

  constructor (
    private readonly controladorService : ControladorService,
    private valvulasService: ValvulasService,
    private receiverService: ReceiverService
  ) {
    this.valvulas = this.valvulasService.get();
  }

  ngOnInit(): void {
    this.receiverService.init();
    this.valvulasService.OnUpdate().subscribe((valvulas: Valvula[]) => {
      this.valvulas = valvulas;
    });
  }

  setStatus(id: number, status : boolean) : void
  {
    this.controladorService.setStatus(id, status)
    .subscribe(
      res => {
      },
      err => {
        console.log(err);
      }
    );
  }
}
