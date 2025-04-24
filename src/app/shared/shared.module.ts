import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderAppointmentComponent } from './header-appointment/header-appointment.component';

@NgModule({
  declarations: [
    HeaderAppointmentComponent
  ],
  exports: [
    HeaderAppointmentComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }