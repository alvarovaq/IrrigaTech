import { Injectable } from '@nestjs/common';
import { BehaviorSubject, Observable } from 'rxjs';
import { Valvula } from 'src/interfaces/valvula.interface';

@Injectable()
export class ValvulasService {
    private valvula: Valvula;
    private _valvula: BehaviorSubject<Valvula>;

    constructor() {
        this.valvula = {
            id: 0,
            open: false,
            date: new Date()
        };
        this._valvula = new BehaviorSubject<Valvula>(this.valvula);
    }

    update(valvula: Valvula)
    {
        if (this.valvula.open != valvula.open)
        {
            this.valvula = valvula;
            this._valvula.next(valvula);
            console.log(this.valvula);
        }
    }

    get(): Valvula
    {
        return this.valvula;
    }

    OnUpdate(): Observable<Valvula>
    {
        return this._valvula.asObservable();
    }

}
