import { Component, OnInit } from '@angular/core';
import { ProfileService, UserProfile } from './profile.service';
import { AuthService } from '../auth/auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  imports: [CommonModule, ReactiveFormsModule] // Ajoutez ceci

})
export class ProfileComponent implements OnInit {
  profile: UserProfile | null = null;
    profileForm: FormGroup;
  selectedFile: File | null = null;

  constructor(
    private profileService: ProfileService,
    private authService: AuthService,
    private fb: FormBuilder
  ) {
    this.profileForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      phone: ['']
    });
  }

  ngOnInit(): void {
    this.loadProfile();
  }

  loadProfile() {
    this.profileService.getProfile().subscribe({
      next: (profile: UserProfile) => {
        this.profile = profile;
        this.profileForm.patchValue({
          firstName: profile.firstName,
          lastName: profile.lastName,
          phone: profile.phoneNumber || ''
        });
      },
      error: (err) => console.error('Failed to load profile', err)
    });
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  uploadPhoto() {
    if (this.selectedFile && this.profile) {
      this.profileService.uploadPhoto(this.selectedFile).subscribe({
        next: (response: any) => {
          if (this.profile) {
            this.profile.profilePhotoUrl = response.photoUrl;
          }
        },
        error: (err) => console.error('Upload failed', err)
      });
    }
  }
  onSubmit() {
    this.profileService.updateProfile(this.profileForm.value).subscribe({
      next: () => {
        this.loadProfile(); // Refresh profile data
      },
      error: (err) => console.error('Update failed', err)
    });
  }
}