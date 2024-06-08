import { Component, Input } from '@angular/core';
import { Weekday } from '@core/enums/weekday';
import { Program } from '@core/interfaces/program.interface';

@Component({
  selector: 'app-program-item',
  templateUrl: './program-item.component.html',
  styleUrls: ['./program-item.component.css']
})
export class ProgramItemComponent {
  @Input() program: Program | undefined;

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

  formatHour(date: Date | undefined) : String {
    if (date == undefined)
      return "";

    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  }

  formatDuration(totalSeconds: number | undefined) : String {
    if (totalSeconds == undefined)
      return "";

    const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
    const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
    const seconds = String(Math.floor(totalSeconds % 60)).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  }
}
