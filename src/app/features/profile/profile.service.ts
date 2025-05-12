import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, OperatorFunction, tap, throwError } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { ProfileResponse } from '../../Models/profile.interface';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private apiUrl = `http://localhost:5278/api/profile`;
  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router
  ) { }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 401) {
      this.authService.logout();
      this.router.navigate(['/login']);
      return throwError(() => new Error('Session expirée - Veuillez vous reconnecter'));
    }
    return throwError(() => error);
  }

  getProfile(): Observable<ProfileResponse> {
    const token = this.authService.getToken();
    
    if (!token || !this.authService.isTokenValid()) {
      this.authService.logout();
      return throwError(() => new Error('Token invalide ou expiré'));
    }
  
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  
    return this.http.get<ProfileResponse>(this.apiUrl, { headers }).pipe(
      catchError(this.handleError.bind(this)),
      tap((profile: ProfileResponse) => {
        this.authService.updateUserProfile(profile.BaseProfile);
      })
    );}

  updateProfile(profileData: any): Observable<any> {
    const token = this.authService.getToken();
    
    if (!token) {
      return throwError(() => new Error('Non authentifié'));
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.put(this.apiUrl, profileData, { headers }).pipe(
      catchError(this.handleError.bind(this)),
      tap((updatedProfile) => {
        // Mettre à jour les informations de l'utilisateur après modification
        this.authService.updateUserProfile(updatedProfile);
      })
    );
  }
}