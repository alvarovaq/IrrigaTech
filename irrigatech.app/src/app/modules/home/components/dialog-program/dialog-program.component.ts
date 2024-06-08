import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Weekday } from '@core/enums/weekday';

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

  save(): void {

  }
}
