import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppointmentsComponent } from './appointments.component';
import { AppointmentsRoutingModule } from './appointments-routing.module';
import { AppointmentsListComponent } from './components/appointments-list/appointments-list.component';
import { AppointmentCreateComponent } from './components/appointment-create/appointment-create.component';
import { AppointmentDetailComponent } from './components/appointment-detail/appointment-detail.component'; // ici l'import du routing
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // 👈 À AJOUTER ICI
import { SharedModule } from '../../shared/shared.module';
import { DoctorInfoComponent } from './doctor-info/doctor-info.component';
import { CalendarRdvComponent } from './calendar-rdv/calendar-rdv.component';
import { AppointmentBookingComponent } from './appointment-booking/appointment-booking.component';
import { DoctorProfileComponent } from './doctor-profile/doctor-profile.component';
import { DescriptionComponent } from './description/description.component';
import { SpecialitesComponent } from './specialites/specialites.component';
import { CoordonneesComponent } from './coordonnees/coordonnees.component';
import { DoctorDetailsComponent } from './doctor-details/doctor-details.component';



@NgModule({
  declarations: [
    AppointmentsComponent,
    AppointmentsListComponent,
    AppointmentCreateComponent,
    AppointmentDetailComponent,
    DoctorInfoComponent,
    CalendarRdvComponent,
    AppointmentBookingComponent,
    DoctorProfileComponent,
    DescriptionComponent,
    SpecialitesComponent,
    CoordonneesComponent,
    DoctorDetailsComponent,
    
  ],
  imports: [
    CommonModule,
    AppointmentsRoutingModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,

  ],
  exports: [
    // ... autres composants exportés si nécessaire ...
    DoctorInfoComponent // Exportez le composant si vous souhaitez l'utiliser dans d'autres modules
    ,AppointmentBookingComponent,
    DoctorProfileComponent,
    DescriptionComponent,
    SpecialitesComponent,
    CoordonneesComponent
     ,// Exportez le composant si vous souhaitez l'utiliser dans d'autres modules
  ]
})
export class AppointmentsModule { }
