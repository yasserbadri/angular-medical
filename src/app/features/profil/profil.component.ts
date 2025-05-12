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
    this.userService.getProfile().subscribe({
      next: (data) => {
        this.profile = data;
        console.log("this is profile:",this.profile);
        console.log(data);
      },
      error: (err) => {
        this.errorMessage = err.message || 'Erreur lors du chargement du profil.';
      }
    });
  }

  isDoctor(): boolean {
    return this.profile?.baseProfile?.role === 'Doctor';
  }
}