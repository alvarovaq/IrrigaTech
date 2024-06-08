import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { SharedModule } from '@shared/shared.module';
import { MatModule } from '@shared/modules/mat/mat.module';
import { ManualCardComponent } from './components/manual-card/manual-card.component';
import { DialogProgramComponent } from './components/dialog-program/dialog-program.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    HomeComponent,
    ManualCardComponent,
    DialogProgramComponent
  ],
  imports: [
    CommonModule,
    MatModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class HomeModule { }
