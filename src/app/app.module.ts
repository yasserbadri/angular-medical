import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './features/auth/auth.module';
import { AppointmentsModule } from './features/appointments/appointments.module';
import { DashboardModule } from './features/dashboard/dashboard.module';
import { UsersModule } from './features/users/users.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LayoutModule } from './components/layout/layout.module';
import { HomeComponent } from './features/home/home.component';
import { SharedModule } from './shared/shared.module';
import { DoctorProfileGuard } from './features/users/doctor-profile-form/doctor-profile.guard';
import { AuthGuard } from './features/auth/auth.guard';
import { DoctorProfileFormComponent } from './features/users/doctor-profile-form/doctor-profile-form.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
   
    
    
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutModule,
    AuthModule,
    HttpClientModule,
    AppointmentsModule,
    DashboardModule,
    
    FormsModule,
    SharedModule,
    
    
    
    
  ],
  providers: [AuthGuard,
    DoctorProfileGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
