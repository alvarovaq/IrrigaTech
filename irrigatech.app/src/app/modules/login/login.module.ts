import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { SharedModule } from '@shared/shared.module';
import { MatModule } from '@shared/modules/mat/mat.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    MatModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class LoginModule { }
