// medical-record-list.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MedicalRecord } from '../../../Models/medical-record';
import { MedicalRecordService } from '../medical-record.service';


@Component({
  selector: 'app-medical-record-list',
  templateUrl: './medical-record-list.component.html',
  styleUrls: ['./medical-record-list.component.scss'],
  standalone:false
})
export class MedicalRecordListComponent implements OnInit {
  records: MedicalRecord[] = [];
  patientId: number = 1; // À définir selon votre logique

  constructor(private medicalRecordService: MedicalRecordService) { }

  ngOnInit(): void {
    this.loadRecords();
  }

  loadRecords(): void {
    this.medicalRecordService.getRecordsByPatient(this.patientId)
      .subscribe(records => this.records = records);
  }
}