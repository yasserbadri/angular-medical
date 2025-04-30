import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DoctorService } from '../../users/doctor.service';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-doctor-profile-form',
  templateUrl: './doctor-profile-form.component.html',
  styleUrls: ['./doctor-profile-form.component.scss']
})
export class DoctorProfileFormComponent implements OnInit {
  profileForm: FormGroup;
  specialities = ['Généraliste', 'Cardiologue', 'Dermatologue', 'Pédiatre', 'ORL', 'Ophtalmologue'];
  selectedFile: File | null = null;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private doctorService: DoctorService,
    private authService: AuthService,
    private router: Router
  ) {
    this.profileForm = this.fb.group({
      speciality: ['', Validators.required],
      description: ['', [Validators.required, Validators.minLength(50)]],
      diploma: ['', Validators.required],
      isGeneralist: [false],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      whatsapp: ['', Validators.pattern(/^[0-9]{10}$/)],
      facebook: [''],
      instagram: [''],
      website: ['']
    });
  }

  ngOnInit(): void {
    // Pré-remplir si des données existent
    const currentUser = this.authService.getCurrentUser();
    if (currentUser?.role === 'Doctor' && currentUser?.isProfileComplete) {
      this.router.navigate(['/home']);
    }
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0] as File;
  }

  onSubmit(): void {
    if (this.profileForm.invalid) return;
  
    this.isLoading = true;
    const formData = new FormData();
  
    // Ajouter les champs du formulaire
    Object.keys(this.profileForm.value).forEach(key => {
      formData.append(key, this.profileForm.get(key)?.value);
    });
  
    // Ajouter le fichier si sélectionné
    if (this.selectedFile) {
      formData.append('profilePhoto', this.selectedFile);
    }
  
    this.doctorService.completeProfile(formData).subscribe({
      next: (response: any) => { // Utilisez 'any' temporairement pour le debug
        console.log('Réponse complète:', response); // Debug
        
        // Adaptez selon la structure réelle de votre réponse
        const userData = response.user || response.data || response;
        this.authService.updateUserProfile(userData);
        this.router.navigate(['/home']);
      },
      error: (err) => {
        console.error('Error:', err);
        this.isLoading = false;
      }
    });
  }}