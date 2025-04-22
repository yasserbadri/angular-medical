import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppointmentsComponent } from './appointments.component'; // modifie si ton component a un nom différent
import { AppointmentsListComponent } from './components/appointments-list/appointments-list.component';
import { AppointmentCreateComponent } from './components/appointment-create/appointment-create.component';
import { AppointmentDetailComponent } from './components/appointment-detail/appointment-detail.component';
const routes: Routes = [
  { path: '', component: AppointmentsComponent },
  { path: 'create', component: AppointmentCreateComponent },
  { path: ':id', component: AppointmentDetailComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppointmentsRoutingModule { }
