import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DoctorListComponent } from './doctor-list/doctor-list.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { PatientListComponent } from './patient-list/patient-list.component';

@NgModule({
  declarations: [DoctorListComponent,PatientListComponent],
  imports: [CommonModule, FormsModule, HttpClientModule,RouterModule],
  exports: [DoctorListComponent,PatientListComponent]
})
export class DoctorPageModule {}
