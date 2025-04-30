import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderAppointmentComponent } from './header-appointment/header-appointment.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    HeaderAppointmentComponent,
    FooterComponent
  ],
  exports: [
    HeaderAppointmentComponent,FooterComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }