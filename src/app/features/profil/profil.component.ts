import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { ProfileResponse } from '../../Models/profile-response.model';

@Component({
  selector: 'app-profil',
  standalone: false,
  templateUrl: './profil.component.html',
  styleUrl: './profil.component.scss'
})
export class ProfilComponent implements OnInit {
  profile: ProfileResponse | null = null;
  errorMessage: string | null = null;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadProfile();
  }

  loadProfile(): void {
    this.userService.getProfile().subscribe({
      next: (data) => {
        this.profile = data;
        console.log("Profile loaded:", this.profile);
      },
      error: (err) => {
        this.errorMessage = err.message || 'Erreur lors du chargement du profil.';
        console.error("Error loading profile:", err);
      }
    });
  }

  isDoctor(): boolean {
    return this.profile?.baseProfile?.role === 'Doctor';
  }

  getInitials(): string {
    if (!this.profile?.baseProfile) return '';

    const firstName = this.profile.baseProfile.firstName || '';
    const lastName = this.profile.baseProfile.lastName || '';
    
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  }

  editProfile(): void {
    // Implémentez la fonctionnalité d'édition ici
    console.log("Edit profile clicked");
    // Vous pouvez naviguer vers une page d'édition ou ouvrir un modal ici
  }}