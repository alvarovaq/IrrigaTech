import { Injectable } from '@nestjs/common';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class ValvulasService {
    private open: boolean = false;
    private _open: BehaviorSubject<boolean>;

    constructor() {
        this._open = new BehaviorSubject<boolean>(false);
    }

    update(open: boolean)
    {
        if (this.open != open)
        {
            this.open = open;
            this._open.next(open);
        }
    }

    get(): boolean
    {
        return this.open;
    }

    OnUpdate(): Observable<boolean>
    {
        return this._open.asObservable();
    }

}
