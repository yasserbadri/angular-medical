import { Component, OnInit } from '@angular/core';
import { ProfileService } from './profile.service';
import { AuthService } from '../auth/auth.service';
import { ProfileResponse } from '../../Models/profile.interface';

@Component({
  selector: 'app-profile',
  standalone: false,
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  profile: any ;
  loading = true;
  error = '';
  isDoctor = false;

  constructor(
    private profileService: ProfileService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.loadProfile();
    this.isDoctor = this.authService.isDoctor();
  }

  loadProfile(): void {
    this.profileService.getProfile().subscribe({
      next: (response) => {
        this.profile = response;
        this.loading = false;
        console.log('Profil chargé avec succès:', this.profile);
      },
      error: (err) => {
        this.error = err.message || 'Erreur lors du chargement du profil';
        this.loading = false;
        console.error('Détails erreur:', err);
      }
    });
  }

  isProfileComplete(): boolean {
    return this.authService.isProfileComplete();
  }
}
