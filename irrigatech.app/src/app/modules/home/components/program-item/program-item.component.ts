import { Component, Input } from '@angular/core';
import { Weekday } from '@core/enums/weekday';
import { Programa } from '@core/interfaces/programa.interface';
import { Tiempo } from '@core/interfaces/tiempo.interface';

@Component({
  selector: 'app-program-item',
  templateUrl: './program-item.component.html',
  styleUrls: ['./program-item.component.css']
})
export class ProgramItemComponent {
  @Input() programa: Programa | undefined;

  getWeekday(weekday: Weekday | undefined): String {
    if (weekday == undefined)
      return "?";

    switch(weekday)
    {
      case Weekday.Lunes:
        return "L";
      case Weekday.Martes:
          return "M";
      case Weekday.Miercoles:
        return "X";
      case Weekday.Jueves:
        return "J";
      case Weekday.Viernes:
        return "V";
      case Weekday.Sabado:
        return "S";
      case Weekday.Domingo:
        return "D";
      default:
        return "?";
    }
  }

  formatHora(hora: Tiempo | undefined) : String {
    if (hora == undefined)
      return "";

    const hours = String(hora.hora).padStart(2, '0');
    const minutes = String(hora.minuto).padStart(2, '0');

    return `${hours}:${minutes}:00`;
  }

  formatDuracion(totalSeconds: number | undefined) : String {
    if (totalSeconds == undefined)
      return "";

    const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
    const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
    const seconds = String(Math.floor(totalSeconds % 60)).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  }
}
