import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Valvula } from '@core/interfaces/valvula.interface';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ControladorService {

    constructor (
        private readonly http : HttpClient
    ) {}

    setStatus (id: number, status : boolean) : Observable<boolean> {
        return this.http.get<boolean>(`${environment.apiUrl}/api/controlador/` + (status ? 'ON' : 'OFF') + '/' + id);
    }

    getStatus(id: number) : Observable<Valvula> {
        return this.http.get<Valvula>(`${environment.apiUrl}/api/controlador/status/${id}`);
    }

    getAllStatus() : Observable<Valvula[]> {
        return this.http.get<Valvula[]>(`${environment.apiUrl}/api/controlador/status`);
    }

}