import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertComponent } from './alert/alert.component';
import { SpinnerComponent } from './spinner/spinner.component';

@NgModule({
  declarations: [
    AlertComponent,
    SpinnerComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CommonModule,
    AlertComponent,
    SpinnerComponent,
  ]
})
export class SharedModule { }
