import { Weekday } from "@core/enums/weekday";

export interface Program {
    weekday: Weekday;
    hour: Date;
    duration: number;
}