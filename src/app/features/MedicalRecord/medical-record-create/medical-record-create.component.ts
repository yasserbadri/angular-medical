// medical-record-create.component.ts
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MedicalRecord } from '../../../Models/medical-record';
import { MedicalRecordService } from '../medical-record.service';


@Component({
  selector: 'app-medical-record-create',
  templateUrl: './medical-record-create.component.html',
  styleUrls: ['./medical-record-create.component.scss'],
  standalone: false,
})
export class MedicalRecordCreateComponent {
  newRecord: MedicalRecord = {
    patientId: 1, // À remplacer par l'ID dynamique
    createdAt: new Date(),
    recordDetails: ''
  };
  saving = false;

  constructor(
    private medicalRecordService: MedicalRecordService,
    private router: Router
  ) {}

  onSubmit(form: NgForm): void {
    if (form.valid) {
      this.saving = true;
      this.medicalRecordService.createMedicalRecord(this.newRecord)
        .subscribe({
          next: () => this.router.navigate(['/medical-records']),
          error: () => this.saving = false
        });
    }
  }
}