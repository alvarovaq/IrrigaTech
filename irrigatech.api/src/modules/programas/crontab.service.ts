import { Injectable, OnModuleInit } from "@nestjs/common";
import { SchedulerRegistry } from "@nestjs/schedule";
import { CronJob } from "cron";
import { Programa } from "./schema/programa.schema";
import { ProgramasService } from "./programas.service";
import { info } from "ps-logger";
import { TareasService } from "../tareas/tareas.service";

@Injectable()
export class CrontabService implements OnModuleInit {

    constructor(
        private schedulerRegistry: SchedulerRegistry,
        private programasService: ProgramasService,
        private tareasService: TareasService
    ) {}

    async onModuleInit() {
        this.programasService.onInit().subscribe((programas: Programa[]) => {
            for (const prog of programas)
                this.addCronJob(prog);
        });

        this.programasService.onUpdate().subscribe((programa: Programa | undefined) => {
            if (programa)
            {
                this.deleteCronJob(programa.id);
                this.addCronJob(programa);
            }
        });

        this.programasService.onDeleted().subscribe((id: string) => {
            this.deleteCronJob(id);
        });
    }

    addCronJob(programa: Programa) : void {
        const job = new CronJob(`0 ${programa.hora.minuto} ${programa.hora.hora} * * ${programa.weekday}`, () => {
            this.callback(programa);
        });

        this.schedulerRegistry.addCronJob(programa.id, job);
        job.start();

        info(`CronJob creado ${programa.id} (${programa.weekday}, ${programa.hora.hora}:${programa.hora.minuto})`);
    }

    deleteCronJob(id: string) : void {
        if (this.schedulerRegistry.doesExist('cron', id))
        {
            this.schedulerRegistry.deleteCronJob(id);
            info(`CronJob eliminado ${id}`);
        }
    }

    callback(programa: Programa) : void {
        info(`CronJob ejecutado ${programa.id}`);
        this.tareasService.run(programa.valvula, programa.id, programa.duracion);
    }
}