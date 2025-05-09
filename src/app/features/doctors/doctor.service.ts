import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DoctorService {
  private apiUrl = 'http://localhost:5278/api/doctors';

  constructor(private http: HttpClient) {}

  
  getAllDoctors(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
  getDoctorById(id: string): Observable<any> {
    if (!id) {
      return throwError(() => new Error('ID du médecin requis'));
    }
    return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(
      catchError(error => {
        console.error('Erreur API:', error);
        return throwError(() => error);
      })
    );
  }

  getDoctorsBySpeciality(speciality: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/by-speciality?speciality=${speciality}`);
  }

  getDoctorsByName(name: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/by-name?name=${name}`);
  }
}
