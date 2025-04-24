import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { UsersComponent } from './features/users/users.component';
import { LayoutComponent } from './components/layout/layout/layout.component';
import { HomeComponent } from './features/home/home.component';
import { AppointmentsComponent } from './features/appointments/appointments.component';

const routes: Routes = [
  { path: '', component: HomeComponent },

  // Routes hors layout
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {path: 'appointments', component:AppointmentsComponent}
  // Routes avec layout
  ,{
    path: '',
    component: LayoutComponent,
    children: [

      { path: 'dashboard', component: DashboardComponent },
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

  // Redirection si route inconnue
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
