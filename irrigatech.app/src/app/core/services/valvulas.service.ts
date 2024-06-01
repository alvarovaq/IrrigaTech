import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ControladorService } from './controlador.service';
import { Valvula } from '@core/interfaces/valvula.interface';

@Injectable({
  providedIn: 'root'
})
export class ValvulasService {

  private valvula: Valvula;
  private _valvula: BehaviorSubject<Valvula>;

  constructor(private readonly controladorService: ControladorService) {
    this.valvula = {
      id: 0,
      open: false,
      date: new Date()
    };
    this._valvula = new BehaviorSubject<Valvula>(this.valvula);
    this.controladorService.getStatus().subscribe((res: Valvula) => this.update(res) );
  }

  OnUpdate() : Observable<Valvula> {
    return this._valvula.asObservable();
  }

  update(valvula: Valvula) : void {
    if (this.valvula != valvula)
    {
      this.valvula = valvula;
      this._valvula.next(this.valvula);
    }
  }

  get() : Valvula
  {
    return this.valvula;
  }
}
