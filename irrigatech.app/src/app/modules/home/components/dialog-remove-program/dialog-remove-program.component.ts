import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-remove-program',
  templateUrl: './dialog-remove-program.component.html',
  styleUrls: ['./dialog-remove-program.component.css']
})
export class DialogRemoveProgramComponent {

  constructor(
    public dialogRef: MatDialogRef<DialogRemoveProgramComponent>
  ) {}

  close(accept: boolean): void{
    this.dialogRef.close(accept);
  }

}
