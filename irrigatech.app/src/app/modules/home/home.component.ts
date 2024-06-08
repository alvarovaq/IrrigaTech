import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Valvula } from '@core/interfaces/valvula.interface';
import { ReceiverService } from '@core/services/receiver.service';
import { ValvulasService } from '@core/services/valvulas.service';
import { DialogProgramComponent } from './components/dialog-program/dialog-program.component';
import { Programa } from '@core/interfaces/programa.interface';
import { Weekday } from '@core/enums/weekday';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  valvulas: Valvula[] = [];

  constructor (
    private valvulasService: ValvulasService,
    private receiverService: ReceiverService,
    public dialogProgram: MatDialog
  ) {
    this.valvulas = this.valvulasService.get();
  }

  ngOnInit(): void {
    this.receiverService.init();
    this.valvulasService.OnUpdate().subscribe((valvulas: Valvula[]) => {
      this.valvulas = valvulas;
    });
  }

  createProgram(): void {
    this.dialogProgram.open(DialogProgramComponent, {
      width: '1000px',
    });
  }
}
