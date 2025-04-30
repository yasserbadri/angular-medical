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

const routes: Routes = [
  { path: '', component: HomeComponent },

  // Routes hors layout
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
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
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
