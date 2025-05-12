import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { UsersComponent } from './features/users/users.component';
import { LayoutComponent } from './components/layout/layout/layout.component';
import { HomeComponent } from './features/home/home.component';
import { AppointmentsComponent } from './features/appointments/appointments.component';
import { DoctorProfileFormComponent } from './features/users/doctor-profile-form/doctor-profile-form.component';
import { DoctorProfileGuard } from './features/users/doctor-profile-form/doctor-profile.guard';
import { AuthGuard } from './features/auth/auth.guard';
import { MedicalRecordListComponent } from './features/MedicalRecord/medical-record-list/medical-record-list.component';
import { MedicalRecordCreateComponent } from './features/MedicalRecord/medical-record-create/medical-record-create.component';
import { MedicalRecordModule } from './features/MedicalRecord/medical-record.module';
import { DoctorGuard } from './features/auth/doctor.guard';
import { HomeDoctorComponent } from './features/home/home-doctor/home-doctor.component';
import { HomePatientComponent } from './features/home/home-patient/home-patient.component';
import { DoctorListComponent } from './features/doctor-page/doctor-list/doctor-list.component';
import { MedicalServiceComponent } from './features/services/medical-service/medical-service.component';
import { MedicalServiceCreateComponent } from './features/services/medical-service-create/medical-service-create.component';
import { MedicalServiceManagerComponent } from './features/services/medical-service-manager/medical-service-manager.component';
import { MedicalServiceListComponent } from './features/services/medical-service-list/medical-service-list.component';
import { DoctorProfileComponent } from './features/appointments/doctor-profile/doctor-profile.component';
import { PatientListComponent } from './features/doctor-page/patient-list/patient-list.component';
import { ProfileComponent } from './features/profile/profile.component';
import { ProfilComponent } from './features/profil/profil.component';

const routes: Routes = [

  { path: '', component: HomeComponent, pathMatch: 'full' },
  { 
    path: 'services', 
    component: MedicalServiceComponent,
    data: { title: 'Nos Services Médicaux' }
  },
  { 
    path: 'services/create', 
    component: MedicalServiceCreateComponent,
    data: { title: 'Créer un nouveau service' }
  },
  { 
    path: 'patients', 
    component: PatientListComponent,
    data: { title: 'les patients qui sont reservé un rendez vous' }
  },
  
 
  /*{ 
    path: 'services/manage/:id', 
    component: MedicalServiceManagerComponent,
    data: { title: 'Gérer le service' }
  },
  { 
    path: 'services/manage', 
    component: MedicalServiceManagerComponent,
    data: { title: 'Créer un service' }
  },*/
  {
    path: 'servicess',
    component: MedicalServiceListComponent,
    data: { title: 'Liste des Services' }
  },
  
  // Route pour créer un nouveau service
  {
    path: 'services/new',
    component: MedicalServiceManagerComponent,
    data: { title: 'Nouveau Service' }
  },
  
  // Route pour modifier un service existant
  {
    path: 'services/edit/:id',
    component: MedicalServiceManagerComponent,
    data: { title: 'Modifier Service' }
  },
  //{ path: 'services', component: ServicesComponent },
  //{ path: 'doctors', component: DoctorsComponent },
  { path: 'appointments', component: AppointmentsComponent },
  //{ path: 'contact', component: ContactComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'doctor/dashboard', component: HomeDoctorComponent, canActivate: [AuthGuard, DoctorGuard] },
  { path: 'patient/dashboard', component: HomePatientComponent, canActivate: [AuthGuard] },
  { path: 'medecins', component: DoctorListComponent },
  {
    path: 'complete-profile',
    component: DoctorProfileFormComponent
    
  },
  {path:'profile',component: ProfileComponent},
  {path:'profil',component:ProfilComponent},
  { path: 'medical-records', component: MedicalRecordListComponent },
  { path: 'medical-records/create', component: MedicalRecordCreateComponent },
  { path: 'doctor/:id', component: DoctorProfileComponent }
  /*{ path: '', component: HomeComponent },
  { 
    path: 'profile', 
    component: ProfileComponent
  },
  { path: 'medical-records', component: MedicalRecordListComponent },
  { path: 'medical-records/create', component: MedicalRecordCreateComponent },

  // Routes hors layout
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { 
    path: 'doctor/dashboard', 
    component: HomeComponent,
    canActivate: [AuthGuard, DoctorGuard] 
  },
  
  { 
    path: 'patient/dashboard', 
    component: HomeComponent,
    canActivate: [AuthGuard] 
  },
  {
    path: 'complete-profile',
    component: DoctorProfileFormComponent,
    canActivate: [AuthGuard, DoctorProfileGuard]
  },
  {path: 'appointments', component:AppointmentsComponent}
  // Routes avec layout
  ,{
    path: '',
    component: LayoutComponent,
    children: [

      //{ path: 'dashboard', component: DashboardComponent },
      { path: 'users', component: UsersComponent },
      {
        path: 'appointments',
        loadChildren: () =>
          import('./features/appointments/appointments.module').then(
            (m) => m.AppointmentsModule
          )
      },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' } // redirection vers dashboard
    ]
  },

  // Pages protégées
  { 
    path: 'dashboard', 
    component: DashboardComponent,
    canActivate: [AuthGuard] 
  },
  {
    path: 'complete-profile',
    component: DoctorProfileFormComponent,
    canActivate: [AuthGuard, DoctorProfileGuard] // Protection double
  },

  // Redirection si route inconnue
  { path: '**', redirectTo: 'login' },*/
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule {}
