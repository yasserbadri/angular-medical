import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MedicalRecordListComponent } from './medical-record-list/medical-record-list.component';
import { MedicalRecordCreateComponent } from './medical-record-create/medical-record-create.component';

@NgModule({
  declarations: [
    
  ],
  imports: [
    CommonModule, // Nécessaire pour *ngIf, *ngFor, date pipe
    FormsModule,  // Nécessaire pour ngForm et ngModel
    ReactiveFormsModule,
    RouterModule  // Nécessaire pour routerLink
  ],
 
})
export class MedicalRecordModule { }