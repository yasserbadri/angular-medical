import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppointmentsComponent } from './appointments.component';
import { AppointmentsRoutingModule } from './appointments-routing.module';
import { AppointmentsListComponent } from './components/appointments-list/appointments-list.component';
import { AppointmentCreateComponent } from './components/appointment-create/appointment-create.component';
import { AppointmentDetailComponent } from './components/appointment-detail/appointment-detail.component'; // ici l'import du routing
import { FormsModule } from '@angular/forms'; // 👈 À AJOUTER ICI



@NgModule({
  declarations: [
    AppointmentsComponent,
    AppointmentsListComponent,
    AppointmentCreateComponent,
    AppointmentDetailComponent
  ],
  imports: [
    CommonModule,
    AppointmentsRoutingModule,
    FormsModule

  ]
})
export class AppointmentsModule { }
