import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Programa } from '@core/interfaces/programa.interface';
import { Valvula } from '@core/interfaces/valvula.interface';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ProgramasService {

    constructor (
        private readonly http : HttpClient
    ) {}

    getProgramas(valvula: number) : Observable<Programa[]> {
        return this.http.get<Programa[]>(`${environment.apiUrl}/api/programas/find/` + valvula);
    }

    crearPrograma(programa: Programa) : Observable<Programa> {
        return this.http.post<Programa>(`${environment.apiUrl}/api/programas/create`, programa);
    }

    editarPrograma(programa: Programa) : Observable<Programa> {
        return this.http.put<Programa>(`${environment.apiUrl}/api/programas/update`, programa);
    }

    eliminarPrograma(id: string) : Observable<Programa> {
        return this.http.delete<Programa>(`${environment.apiUrl}/api/programas/remove/` + id);
    }
}