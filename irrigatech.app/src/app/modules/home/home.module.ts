import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { SharedModule } from '@shared/shared.module';
import { MatModule } from '@shared/modules/mat/mat.module';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    MatModule,
    SharedModule
  ]
})
export class HomeModule { }
