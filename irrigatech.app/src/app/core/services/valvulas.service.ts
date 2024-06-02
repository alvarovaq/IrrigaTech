import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ControladorService } from './controlador.service';
import { Valvula } from '@core/interfaces/valvula.interface';

@Injectable({
  providedIn: 'root'
})
export class ValvulasService {

  private valvulas: Valvula[] = [];
  private _valvulas: BehaviorSubject<Valvula[]>;

  constructor(private readonly controladorService: ControladorService) {
    const date = new Date();
    for (let id = 1; id <= 6; id++)
    {
        let valvula : Valvula = { id, open: false, date };
        this.valvulas.push(valvula);
    }
    this._valvulas = new BehaviorSubject<Valvula[]>([]);
    this.controladorService.getAllStatus().subscribe((res: Valvula[]) => { console.log(res); this.update(res); } );
  }

  OnUpdate() : Observable<Valvula[]> {
    return this._valvulas.asObservable();
  }

  update(valvulas: Valvula[]) : void {
    let actualizado : boolean = false;
    for (const valv of valvulas)
    {
        const index = this.valvulas.findIndex((v) => v.id == valv.id);
        if (index != -1 && this.valvulas[index] != valv)
        {
            this.valvulas[index] = valv;
            actualizado = true;
        }
    }
    if (actualizado)
      this._valvulas.next(this.valvulas);
  }

  find(id: number) : Valvula | undefined
  {
    return this.valvulas.find((valv) => valv.id == id);
  }

  get() : Valvula[]
  {
    return this.valvulas;
  }
}
