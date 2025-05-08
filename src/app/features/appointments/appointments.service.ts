// appointment.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private apiUrl = 'http://localhost:5278/api/appointments'; // Adaptez selon votre configuration

  constructor(private http: HttpClient) { }

  getAvailableDoctors(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/doctors`);
  }

  getDoctorAvailability(doctorId: string, date: Date): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/availability/${doctorId}?date=${date.toISOString()}`);
  }

  createAppointment(appointment: any): Observable<any> {
    return this.http.post(this.apiUrl, appointment);
  }
}