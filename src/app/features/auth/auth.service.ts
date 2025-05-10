import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public apiUrl = 'http://localhost:5278/api/auth'; 
  private currentUserSubject = new BehaviorSubject<any>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {
    this.loadUserFromStorage();
  }

  private loadUserFromStorage(): void {
    const user = localStorage.getItem('user');
    if (user) {
      this.currentUserSubject.next(JSON.parse(user));
    }
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, password }).pipe(
      tap((res: any) => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('user', JSON.stringify(res.user));
        this.currentUserSubject.next(res.user);
        console.log('Utilisateur connecté:', res.user);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  getCurrentUser(): any {
    return this.currentUserSubject.value;
  }
  

  isAuthenticated(): boolean {
    return !!this.getCurrentUser();
  }

  isDoctor(): boolean {
    const user = this.getCurrentUser();
    return user?.role === 'Doctor';
  }

  isPatient(): boolean {
    const user = this.getCurrentUser();
    return user?.role === 'Patient';
  }

  // Ajoutez cette méthode pour vérifier si le profil est complet
  isProfileComplete(): boolean {
    const user = this.getCurrentUser();
    if (this.isDoctor()) {
      return user?.isProfileComplete;
    }
    return true; // Pour les patients, considérez que le profil est toujours complet
  }
  isLoggedOff(): boolean {
    return !this.isLoggedIn();
  }
  redirectUrl: string | null = null;

  
  // auth.service.ts
// auth.service.ts
getToken(): string | null {
  const token = localStorage.getItem('token');
  if (!token) {
    console.warn('No token found in localStorage');
    return null;
  }
  return token;
}

isTokenValid(): boolean {
  const token = this.getToken();
  if (!token) return false;
  
  try {
    // Decode token without verification
    const payload = JSON.parse(atob(token.split('.')[1]));
    const isExpired = payload.exp * 1000 < Date.now();
    
    if (isExpired) {
      console.warn('Token expired at', new Date(payload.exp * 1000));
      
    }
    
    return !isExpired;
  } catch (e) {
    console.error('Error decoding token:', e);
    return false;
  }
}



  
 /* constructor(private http: HttpClient) {}*/

  /*login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, password }).pipe(
      tap((res: any) => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('user', JSON.stringify(res.user));
      })
    );
  }
 */

  register(userData: any): Observable<any> {
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
 

 /* isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  getCurrentUser(): any {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }*/

  

  
  
  
    updateUserProfile(userData: any): void {
      const currentUser = this.getCurrentUser();
      if (currentUser) {
        const updatedUser = { ...currentUser, ...userData };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        this.currentUserSubject.next(updatedUser);
      }
    }
  
  isDoctorProfileComplete(): boolean {
    const user = this.getCurrentUser();
    return user?.role === 'Doctor' && user?.isProfileComplete;
  }
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token'); // Ou votre méthode de vérification
  }

  /*getToken(): string | null {
    return localStorage.getItem('token');
  }
*/
  

 

  /*isDoctor(): boolean {
    const user = this.getCurrentUser();
    return user?.role === 'Doctor' && user?.isProfileComplete;
  }*/
}