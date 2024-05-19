import { Component } from '@angular/core';
import { ControladorService } from './core/services/controlador.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  constructor (
    private readonly controladorService : ControladorService
  ) {}

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
