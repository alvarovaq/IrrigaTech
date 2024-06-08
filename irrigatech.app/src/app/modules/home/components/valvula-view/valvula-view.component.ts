import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Programa } from '@core/interfaces/programa.interface';
import { Valvula } from '@core/interfaces/valvula.interface';
import { DialogProgramComponent } from '../dialog-program/dialog-program.component';
import { ProgramasService } from '../../../../core/services/programas.service';

@Component({
  selector: 'app-valvula-view',
  templateUrl: './valvula-view.component.html',
  styleUrls: ['./valvula-view.component.css']
})
export class ValvulaViewComponent implements OnInit {
  @Input() valvula: Valvula;
  programas: Programa[] = [];

  constructor(
    public dialogProgram: MatDialog,
    private readonly programasService: ProgramasService
  ) {
    this.valvula = {
      id: 0,
      open: false,
      date: new Date()
    };
  }

  ngOnInit(): void {
    this.programasService.getProgramas(this.valvula.id).subscribe((programas) => {
      this.programas = programas;
    });
  }

  createProgram(): void {
    const dialogRef = this.dialogProgram.open(DialogProgramComponent, {
      data: { valvula: this.valvula.id },
      width: '1000px',
    });

    dialogRef.afterClosed().subscribe(programa => {
      if (programa)
      {
        this.programasService.crearPrograma(programa).subscribe((prog) => {
          this.programas.push(prog);
          this.sortProgramas();
        });
      }
    });
  }

  sortProgramas() : void {
    this.programas.sort((p1: Programa, p2: Programa) => {
      if (p1.weekday != p2.weekday) 
      {
        const val1 = p1.weekday == 0 ? 7 : p1.weekday;
        const val2 = p2.weekday == 0 ? 7 : p2.weekday;
        return val1 - val2;
      }
      
      if (p1.hora.hora != p2.hora.hora)
        return p1.hora.hora - p2.hora.hora;

      return p1.hora.minuto - p2.hora.minuto;
    });
  }
}
