import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DoctorListComponent } from './doctor-list/doctor-list.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [DoctorListComponent,],
  imports: [CommonModule, FormsModule, HttpClientModule,RouterModule],
  exports: [DoctorListComponent,]
})
export class DoctorPageModule {}
