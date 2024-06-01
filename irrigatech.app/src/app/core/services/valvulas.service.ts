import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ControladorService } from './controlador.service';

@Injectable({
  providedIn: 'root'
})
export class ValvulasService {

  private open: boolean = false;
  private _open: BehaviorSubject<boolean>;

  constructor(private readonly controladorService: ControladorService) {
    this._open = new BehaviorSubject<boolean>(false);
    this.controladorService.getStatus().subscribe((res) => this.update(res));
  }

  OnUpdate() : Observable<boolean> {
    return this._open.asObservable();
  }

  update(open: boolean) : void {
    if (this.open != open)
    {
      this.open = open;
      this._open.next(this.open);
    }
  }

  get() : boolean
  {
    return this.open;
  }
}
