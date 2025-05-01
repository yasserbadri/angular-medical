import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { QuickNoteComponent } from '../quick-note/quick-note.component';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule],
  selector: 'app-doctor-sidebar',
  templateUrl: './doctor-sidebar.component.html',
  styleUrls: ['./doctor-sidebar.component.scss']
})
export class DoctorSidebarComponent {
  isCollapsed = false;

  constructor(private router: Router, private dialog: MatDialog) {}

  toggleCollapse(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  openQuickNote(): void {
    this.dialog.open(QuickNoteComponent, {
      width: '500px',
      data: { patientId: null }
    });
  }

  openPrescriptionTool(): void {
    this.router.navigate(['/prescription-tool']);
  }

  openMedicalDictionary(): void {
    window.open('https://www.dictionnaire-medical.net/', '_blank');
  }

  openCalendar(): void {
    this.router.navigate(['/doctor/calendar']);
  }

  openEmergencyProtocol(): void {
    this.router.navigate(['/emergency-protocol']);
  }
}