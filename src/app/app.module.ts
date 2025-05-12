import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './features/auth/auth.module';
import { AppointmentsModule } from './features/appointments/appointments.module';
import { DashboardModule } from './features/dashboard/dashboard.module';
import { UsersModule } from './features/users/users.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LayoutModule } from './components/layout/layout.module';
import { HomeComponent } from './features/home/home.component';
import { SharedModule } from './shared/shared.module';
import { DoctorProfileGuard } from './features/users/doctor-profile-form/doctor-profile.guard';
import { AuthGuard } from './features/auth/auth.guard';
import { MedicalRecordCreateComponent } from './features/MedicalRecord/medical-record-create/medical-record-create.component';
import { MedicalRecordListComponent } from './features/MedicalRecord/medical-record-list/medical-record-list.component';
import { CommonModule } from '@angular/common';
import { QuickNoteComponent } from './features/doctors/quick-note/quick-note.component';
import { DoctorSidebarComponent } from './features/doctors/doctor-sidebar/doctor-sidebar.component';
import { AuthService } from './features/auth/auth.service';
import { HomeDoctorComponent } from './features/home/home-doctor/home-doctor.component';
import { HomePatientComponent } from './features/home/home-patient/home-patient.component';
import { DoctorListComponent } from './features/doctor-page/doctor-list/doctor-list.component';
import { DoctorPageModule } from './features/doctor-page/doctor-page.module';
import { AuthInterceptor } from './auth.interceptor';
import { MedicalServiceComponent } from './features/services/medical-service/medical-service.component';
import { MedicalServiceCreateComponent } from './features/services/medical-service-create/medical-service-create.component';
import { MedicalServiceManagerComponent } from './features/services/medical-service-manager/medical-service-manager.component';
import { MedicalServiceListComponent } from './features/services/medical-service-list/medical-service-list.component';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { ConfirmDialogComponent } from './features/services/confirm-dialog/confirm-dialog.component';
  import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProfileComponent } from './features/profile/profile.component';
import { ProfilComponent } from './features/profil/profil.component';

//import { MedicalRecordModule } from './features/MedicalRecord/medical-record.module';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MedicalRecordCreateComponent,
    MedicalRecordListComponent,
    
    QuickNoteComponent,
          HomeDoctorComponent,
          HomePatientComponent,
          MedicalServiceComponent,
          MedicalServiceCreateComponent,
          MedicalServiceManagerComponent,
          MedicalServiceListComponent,
          ProfileComponent,
          ProfilComponent,
          

    
  
    
   
    
    
    
    
  ],
  imports: [
  BrowserModule,
    AppRoutingModule,
    LayoutModule,
    AuthModule,
    HttpClientModule,
    AppointmentsModule,
    DashboardModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    //MedicalRecordModule,
    DoctorSidebarComponent,
    DoctorPageModule,
    MatTableModule,
    
    MatIconModule,
    
    MatSnackBarModule,
    MatCardModule,
    BrowserAnimationsModule,
    
    
    
    
    
    
    
  ],
  providers: [AuthGuard,
    DoctorProfileGuard,AuthService,{
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
      
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
