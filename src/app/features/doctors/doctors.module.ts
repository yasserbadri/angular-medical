// doctors.module.ts
import { QuickNoteModule } from './quick-note/quick-note.module';
import { NgModule } from '@angular/core';
import { QuickNoteComponent } from './quick-note/quick-note.component';
import { DoctorSidebarComponent } from './doctor-sidebar/doctor-sidebar.component';

@NgModule({
    declarations: [ QuickNoteComponent, DoctorSidebarComponent],
   
    exports: [QuickNoteComponent]
})
export class DoctorsModule { }
// doctors.module.ts