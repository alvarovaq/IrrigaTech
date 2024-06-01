import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { MatModule } from './modules/mat/mat.module';



@NgModule({
  declarations: [
    ToolbarComponent
  ],
  imports: [
    CommonModule,
    MatModule
  ],
  exports: [
    ToolbarComponent
  ]
})
export class SharedModule { }
