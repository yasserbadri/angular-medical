import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5278/api/auth'; // ⚠️ adapte au port réel de ton backend

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, password }).pipe(
      tap((res: any) => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('user', JSON.stringify(res.user));
      })
    );
  }
 

  register(userData: any): Observable<any> {
    // Format compatible avec ASP.NET Core
    const body = {
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      password: userData.password,
      role: userData.role || 'Patient' // Valeur par défaut
    };
  
    console.log('Payload final:', JSON.stringify(body));
  
    return this.http.post(`${this.apiUrl}/register`, body, {
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }).pipe(
      catchError(error => {
        console.error('Détails erreur:', error.error);
        throw error;
      })
    );
  }
 

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  getCurrentUser(): any {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  

  
  
  
  updateUserProfile(userData: any): void {
    const currentUser = this.getCurrentUser();
    const updatedUser = { ...currentUser, ...userData };
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
  }
  
  isDoctorProfileComplete(): boolean {
    const user = this.getCurrentUser();
    return user?.role === 'Doctor' && user?.isProfileComplete;
  }
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token'); // Ou votre méthode de vérification
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

 

  // OU une version plus complète si vous avez besoin de vérifier le profil complet :
  isDoctor(): boolean {
    const user = this.getCurrentUser();
    return user?.role === 'Doctor' && user?.isProfileComplete;
  }
}