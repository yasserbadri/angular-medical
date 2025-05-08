import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DoctorListComponent } from './doctor-list/doctor-list.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [DoctorListComponent,],
  imports: [CommonModule, FormsModule, HttpClientModule,],
  exports: [DoctorListComponent,]
})
export class DoctorPageModule {}
