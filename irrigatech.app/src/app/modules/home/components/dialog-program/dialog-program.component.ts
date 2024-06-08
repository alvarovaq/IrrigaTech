import { Component, Inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Weekday } from '@core/enums/weekday';
import { Program } from '@core/interfaces/program.interface';

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
    @Inject(MAT_DIALOG_DATA) public data: Program | undefined,
    private fb: FormBuilder
  ) {
    this.programForm = this.fb.group({
      weekday: [Weekday.Lunes, [Validators.required]],
      hour: ['', [Validators.required, this.timeValidator]],
      durationHour: [0, []],
      durationMin: [10, []],
      durationSec: [0, []],
    });
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

  getHour(): Date {
    const parts = this.programForm.get('hour')?.value.split(':');
    const date = new Date(0, 0, 0);
    date.setHours(parseInt(parts[0]));
    date.setMinutes(parseInt(parts[1]));
    date.setSeconds(0);
    return date;
  }

  getDuration(): number {
    let seconds = this.programForm.get('durationSec')?.value;
    seconds += this.programForm.get('durationMin')?.value * 60;
    seconds += this.programForm.get('durationHour')?.value * 3600;
    return seconds;
  }

  getProgram(): Program | undefined {
    return {
      weekday: this.programForm.get('weekday')?.value,
      hour: this.getHour(),
      duration: this.getDuration()
    };
  }

  save(): void {
    this.dialogRef.close(this.getProgram());
  }
}
