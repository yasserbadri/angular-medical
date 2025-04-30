import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  private apiUrl = 'http://localhost:5278/api/auth'; // Définition directe

  constructor(private http: HttpClient) { }
  

  completeProfile(profileData: FormData) {
    return this.http.post(`${this.apiUrl}/complete-doctor-profile`, profileData);
  }

  getProfile(doctorId: string) {
    return this.http.get(`${this.apiUrl}/doctor-profile/${doctorId}`);
  }
}