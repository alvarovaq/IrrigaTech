import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Program } from '@core/interfaces/program.interface';
import { Valvula } from '@core/interfaces/valvula.interface';
import { DialogProgramComponent } from '../dialog-program/dialog-program.component';

@Component({
  selector: 'app-valvula-view',
  templateUrl: './valvula-view.component.html',
  styleUrls: ['./valvula-view.component.css']
})
export class ValvulaViewComponent {
  @Input() valvula: Valvula;
  programs: Program[] = [];

  constructor(
    public dialogProgram: MatDialog
  ) {
    this.valvula = {
      id: 0,
      open: false,
      date: new Date()
    };
  }

  createProgram(): void {
    const dialogRef = this.dialogProgram.open(DialogProgramComponent, {
      width: '1000px',
    });

    dialogRef.afterClosed().subscribe(program => {
      console.log(program);
      if (program)
      {
        this.programs.push(program);
        this.sortPrograms();
      }
    });
  }

  sortPrograms() : void {
    this.programs.sort((p1: Program, p2: Program) => {
      if (p1.weekday != p2.weekday)
      {
        const val1 = p1.weekday == 0 ? 7 : p1.weekday;
        const val2 = p2.weekday == 0 ? 7 : p2.weekday;
        return val1 - val2;
      }
      
      return p1.hour.getTime() - p2.hour.getTime();
    });
  }
}
