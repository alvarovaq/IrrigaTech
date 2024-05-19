import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ControladorService {

    constructor (
        private readonly http : HttpClient
    ) {}

    setStatus (status : boolean) : Observable<boolean> {
        return this.http.get<boolean>(`${environment.apiUrl}/api/controlador/` + (status ? 'ON' : 'OFF'));
    }

}