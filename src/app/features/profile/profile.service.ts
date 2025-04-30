import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
export interface UserProfile {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber?: string;
    role: string;
    speciality?: string;
    description?: string;
    profilePhotoUrl?: string;
    isProfileComplete: boolean;
  }

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private apiUrl = `http://localhost:5278/api/profile`;

  constructor(private http: HttpClient) { }

  getProfile() {
    return this.http.get<UserProfile>(`${this.apiUrl}`);
  }

  updateProfile(profileData: any) {
    return this.http.put(`${this.apiUrl}`, profileData);
  }

  uploadPhoto(file: File) {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(`${this.apiUrl}/upload-photo`, formData);
  }
}