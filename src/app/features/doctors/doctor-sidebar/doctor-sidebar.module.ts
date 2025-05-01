// doctor-sidebar.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DoctorSidebarComponent } from './doctor-sidebar.component';

@NgModule({
  declarations: [
    DoctorSidebarComponent
  ],
  imports: [
    CommonModule,
    // autres imports nécessaires
  ],
  exports: [ // <-- Cette section est cruciale
    DoctorSidebarComponent
  ]
})
export class DoctorSidebarModule { }