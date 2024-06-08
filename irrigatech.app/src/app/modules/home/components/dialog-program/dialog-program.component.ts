import { Component, Inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Weekday } from '@core/enums/weekday';
import { Programa } from '@core/interfaces/programa.interface';
import { Tiempo } from '@core/interfaces/tiempo.interface';

export interface DataDialogProgram {
  valvula: number,
  new: boolean,
  programa: Programa | undefined
}

@Component({
  selector: 'app-dialog-program',
  templateUrl: './dialog-program.component.html',
  styleUrls: ['./dialog-program.component.css']
})
export class DialogProgramComponent {
  programForm: FormGroup;
  enumWeekday = Weekday;

  constructor (
    public dialogRef: MatDialogRef<DialogProgramComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DataDialogProgram | undefined,
    private fb: FormBuilder
  ) {
    let hours: number = 0;
    let min: number = 0;
    let sec: number = 0;

    if (this.data && !this.data.new)
    {
      const duracion: number = this.data.programa?.duracion!;
      hours = Math.floor(duracion / 3600);
      min = Math.floor((duracion % 3600) / 60);
      sec = Math.floor(duracion % 60);
    }

    this.programForm = this.fb.group({
      weekday: [this.data && !this.data.new ? this.data.programa?.weekday : Weekday.Lunes, [Validators.required]],
      hour: [this.data && !this.data.new ? this.getStringHora(this.data.programa?.hora!) : '', [Validators.required, this.timeValidator]],
      durationHour: [hours, []],
      durationMin: [min, []],
      durationSec: [sec, []],
    });
  }

  getStringHora(hora: Tiempo) : string {
    const hours = String(hora.hora).padStart(2, '0');
    const minutes = String(hora.minuto).padStart(2, '0');

    return `${hours}:${minutes}`;
  }

  timeValidator(control: AbstractControl) : { [key: string]: boolean } | null {
    const timePattern = /^([01]\d|2[0-3]):([0-5]\d)$/;
    if (control.value && !timePattern.test(control.value)) {
      return { 'invalidTime': true };
    }
    return null;
  }

  close(): void {
    this.dialogRef.close();
  }

  getHour(): Tiempo {
    const parts = this.programForm.get('hour')?.value.split(':');
    let hora : Tiempo = {
      hora: parseInt(parts[0]),
      minuto: parseInt(parts[1])
    };
    return hora;
  }

  getDuration(): number {
    let seconds = this.programForm.get('durationSec')?.value;
    seconds += this.programForm.get('durationMin')?.value * 60;
    seconds += this.programForm.get('durationHour')?.value * 3600;
    return seconds;
  }

  getPrograma(): Programa | undefined {
    if (!this.data || (!this.data.new && !this.data.programa))
      return undefined;
    
    return {
      id: this.data.new ? "" : this.data.programa?.id!,
      valvula: this.data.valvula,
      weekday: this.programForm.get('weekday')?.value,
      hora: this.getHour(),
      duracion: this.getDuration()
    };
  }

  save(): void {
    this.dialogRef.close(this.getPrograma());
  }
}
