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
    return throwError(() => new Error('No token found'));
  }

  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
    // Don't set Content-Type - let browser set it for FormData
  });

  return this.http.post(
    `${this.apiUrl}/auth/complete-doctor-profile`,
    formData,
    { 
      headers,
      observe: 'response' 
    }
  ).pipe(
    catchError(error => {
      // Improved error handling
      if (error.status === 400) {
        // Bad Request - validation errors
        return throwError(() => error.error);
      } else if (error.status === 401) {
        // Unauthorized
        return throwError(() => ({ message: 'Session expired. Please login again.' }));
      } else {
        // Other errors
        return throwError(() => ({ 
          message: error.error?.message || 'An unexpected error occurred'
        }));
      }
    })
  );
}}