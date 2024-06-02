import { Injectable } from '@nestjs/common';
import { BehaviorSubject, Observable } from 'rxjs';
import { Valvula } from 'src/interfaces/valvula.interface';

@Injectable()
export class ValvulasService {
    private valvulas: Valvula[] = [];
    private _valvulas: BehaviorSubject<Valvula[]>;

    constructor() {
        const date = new Date();
        for (let id = 1; id <= 6; id++)
        {
            let valvula : Valvula = { id, open: false, date };
            this.valvulas.push(valvula);
        }
        this._valvulas = new BehaviorSubject<Valvula[]>([]);
    }

    update(valvulas: Valvula[]) : void
    {
        let updValvulas: Valvula[] = [];
        for (const valv of valvulas)
        {
            const index = this.valvulas.findIndex((v) => v.id == valv.id);
            if (index != -1 && this.valvulas[index].open != valv.open)
            {
                this.valvulas[index] = valv;
                updValvulas.push(valv);
            }
        }
        this._valvulas.next(updValvulas);
    }

    find(id: number): Valvula | undefined
    {
        return this.valvulas.find((valv) => valv.id == id);
    }

    OnUpdate(): Observable<Valvula[]>
    {
        return this._valvulas.asObservable();
    }

    get(): Valvula[]
    {
        return this.valvulas;
    }

}
