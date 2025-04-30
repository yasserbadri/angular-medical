// medical-record.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable , catchError, throwError } from 'rxjs';
import { MedicalRecord } from '../../Models/medical-record'; // Assurez-vous que le chemin est correct
import { tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class MedicalRecordService {
  private apiUrl = 'http://localhost:5278/api/medicalrecords';

  constructor(private http: HttpClient) { }

  getRecordsByPatient(patientId: number): Observable<MedicalRecord[]> {
    return this.http.get<MedicalRecord[]>(`${this.apiUrl}/${patientId}`);
  }

  createMedicalRecord(record: MedicalRecord): Observable<MedicalRecord> {
    return this.http.post<MedicalRecord>(this.apiUrl, record);
  }
}