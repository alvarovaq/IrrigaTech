import { Weekday } from "@core/enums/weekday";
import { Tiempo } from "./tiempo.interface";

export interface Programa {
    id: string,
    valvula: number;
    weekday: Weekday;
    hora: Tiempo;
    duracion: number;
}