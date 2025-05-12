import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { ProfileResponse } from '../../Models/profile-response.model';

@Injectable({ providedIn: 'root' })
export class UserService {
      private apiUrl = 'http://localhost:5278/api/profile'; // ou votre vraie URL d'API

   constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router
  ) {}

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
      this.router.navigate(['/login']);
      return throwError(() => new Error('Token invalide ou expiré'));
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.get<ProfileResponse>(this.apiUrl, { headers }).pipe(
      catchError(this.handleError.bind(this)),
      tap((profile: ProfileResponse) => {
        this.authService.updateUserProfile(profile['baseProfile'] || profile);
      })
    );
  }
}