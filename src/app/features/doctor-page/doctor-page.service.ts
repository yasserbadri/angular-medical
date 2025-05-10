import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DoctorPageService {
  private apiUrl = 'http://localhost:5278/api/doctors';
   private apiUrll = 'http://localhost:5278/api/appointments'; // Adaptez selon votre configuration

  constructor(private http: HttpClient) {}

  getAllDoctors(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getDoctorsBySpeciality(speciality: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/by-speciality?speciality=${speciality}`);
  }

  getDoctorsByName(name: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/by-name?name=${name}`);
  }
  getPatientsByDoctorId(doctorId: string): Observable<any[]> {
      return this.http.get<any[]>(`${this.apiUrll}/doctor/${doctorId}/patients`);
}}
