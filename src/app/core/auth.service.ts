import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5278/api/auth'; // Remplace par ton URL d'API

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    const body = { email, password };
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post(`${this.apiUrl}/login`, body, { headers });
  }
    // Exemple d'appel d'une API nécessitant un token d'authentification
    getUserProfile(): Observable<any> {
        const token = localStorage.getItem('token');  // Récupérer le token
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        });
    
        return this.http.get('http://ton-backend-api-url/user/profile', { headers });
      }
      register(email: string, password: string): Observable<any> {
        return this.http.post(`${this.apiUrl}/register`, { email, password });
      }
}
