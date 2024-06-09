import { Injectable } from '@nestjs/common';
import { Tarea } from './interfaces/tarea.interface';
import { SchedulerRegistry } from '@nestjs/schedule';
import { info } from 'ps-logger';
import { ConnectorService } from '../mqtt/connector.service';

@Injectable()
export class TareasService {
    private tareas: Tarea[] = [];

    constructor(
        private schedulerRegistry: SchedulerRegistry,
        private connectorService: ConnectorService 
    ) {
        for (let valv = 1; valv <= 6; valv++)
        {
            const tarea: Tarea = {
                valvula: valv,
                programa: "",
                fecha: new Date(),
                duracion: 0,
                run: false
            };
            this.tareas.push(tarea); 
        }
    }

    run(valvula: number, programa: string, seconds: number): void {
        const index = this.tareas.findIndex((tarea) => tarea.valvula === valvula);
        if (index !== -1) {
            let now: Date = new Date();
            const tarea = this.tareas[index];
            if (!(tarea.run && (now.getTime() + seconds * 1000 <= tarea.fecha.getTime() + tarea.duracion * 1000))) {
                const newTarea: Tarea = {
                    valvula,
                    programa,
                    fecha: now,
                    duracion: seconds,
                    run: true
                };

                this.tareas[index] = newTarea;
                this.connectorService.send(valvula, true);
                this.addTiemout(newTarea);
            }
        }
    }

    addTiemout(tarea: Tarea) {
        const timeout = setTimeout(() => this.callback(tarea), tarea.duracion * 1000);
        this.schedulerRegistry.addTimeout(String(tarea.valvula), timeout);
        info(`Tarea arrancada ${tarea.valvula} ${tarea.programa}`);
    }

    deleteTimeout(valvula: number) {
        if (this.schedulerRegistry.doesExist('timeout', String(valvula))){
            this.schedulerRegistry.deleteTimeout(String(valvula));
            info(`Tarea eliminada ${valvula}`);
        }
    }

    callback(tarea: Tarea): void {
        info(`Tarea finalizada ${tarea.valvula} ${tarea.programa}`);
        this.connectorService.send(tarea.valvula, false);
        const index = this.tareas.findIndex((t) => t.valvula === tarea.valvula);
        if (index !== -1) {
            let tarea = this.tareas[index];
            tarea.run = false;
            this.tareas[index] = tarea;
        }
    }
}
