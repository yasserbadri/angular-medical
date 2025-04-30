import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { DoctorProfileFormComponent } from './doctor-profile-form/doctor-profile-form.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DoctorProfileFormComponent

  ]
})
export class UsersModule { }
