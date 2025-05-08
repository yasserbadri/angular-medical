import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './../auth/auth.service';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  private apiUrl = 'http://localhost:5278/api'; // Base URL without '/auth'

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  // doctor.service.ts
// doctor.service.ts
completeProfile(formData: FormData): Observable<any> {
  const token = this.authService.getToken();
  
  if (!token) {
    console.error('No token found - user might not be authenticated');
    return throwError(() => new Error('No token found'));
  }

  // For FormData uploads, we must NOT set Content-Type - let browser set it
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
    // No Content-Type header for FormData!
  });

  console.log('Request headers:', headers); // Debug

  return this.http.post(
    `${this.apiUrl}/auth/complete-doctor-profile`,
    formData,
    { 
      headers,
      observe: 'response' 
    }
  ).pipe(
    catchError(error => {
      console.error('Profile update error:', error);
      if (error.status === 401) {
        console.error('Authentication failed - token might be invalid or expired');
      }
      return throwError(() => error);
    })
  );
}
  getProfile(doctorId: string) {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get(
      `${this.apiUrl}/auth/doctor-profile/${doctorId}`,
      { headers }
    ).pipe(
      catchError(error => {
        console.error('Profile fetch error:', error);
        return throwError(() => error);
      })
    );
  }
}