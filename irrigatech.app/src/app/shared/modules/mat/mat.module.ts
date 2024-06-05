import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatTabsModule} from '@angular/material/tabs'; 
import {MatBadgeModule} from '@angular/material/badge'; 
import {MatProgressBarModule} from '@angular/material/progress-bar';

const MatModules = [
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
  MatTabsModule,
  MatBadgeModule,
  MatProgressBarModule
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ...MatModules
  ],
  exports: [
    ...MatModules
  ]
})
export class MatModule { }
