// services/medical-service.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MedicalServiceService {
  private apiUrl = 'http://localhost:5278/api/services';

  constructor(private http: HttpClient) { }

  // GET all services
  getServices(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // GET single service
  getService(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  getCategories(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/categories`);
  }
   // Nouvelle méthode pour créer un service
   createService(serviceData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, serviceData).pipe(
        catchError(error => {
            console.error('API Error:', error);
            let errorMsg = 'Erreur inconnue';
            if (error.error instanceof ErrorEvent) {
                errorMsg = `Erreur: ${error.error.message}`;
            } else {
                errorMsg = `Erreur serveur: ${error.status} - ${error.message}`;
            }
            return throwError(() => new Error(errorMsg));
        })
    );
}

deleteService(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
        catchError(error => {
            console.error('API Error:', error);
            let errorMsg = 'Erreur lors de la suppression';
            if (error.error instanceof ErrorEvent) {
                errorMsg = `Erreur: ${error.error.message}`;
            } else {
                errorMsg = `Erreur serveur: ${error.status} - ${error.message}`;
            }
            return throwError(() => new Error(errorMsg));
        })
    );
}
// PUT update service
updateService(id: number, serviceData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, serviceData);
  }

  
}