import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DoctorService } from '../../users/doctor.service';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-doctor-profile-form',
  templateUrl: './doctor-profile-form.component.html',
  imports: [CommonModule, ReactiveFormsModule], // <-- Ajoutez ReactiveFormsModule ici
  
  styleUrls: ['./doctor-profile-form.component.scss']
})
export class DoctorProfileFormComponent implements OnInit {
  profileForm: FormGroup;
  specialities = ['Généraliste', 'Cardiologue', 'Dermatologue', 'Pédiatre', 'ORL', 'Ophtalmologue'];
  selectedFile: File | null = null;
  profileImagePreview: string | ArrayBuffer | null = null;
  isLoading = false;
  currentStep = 1;
  showSuccessMessage = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private doctorService: DoctorService,
    private authService: AuthService,
    private router: Router
  ) {
    this.profileForm = this.fb.group({
      speciality: ['', Validators.required],
      description: ['', [Validators.required, Validators.minLength(50), Validators.maxLength(500)]],
      diploma: ['', Validators.required],
      isGeneralist: [false],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10,15}$/)]],  // Updated pattern
      whatsapp: ['', Validators.pattern(/^[0-9]{10,15}$/)],  // Changed from whatsappNumber to whatsapp
      facebook: [''],
      instagram: [''],
      website: ['']
    });
  }

  ngOnInit(): void {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser?.role === 'Doctor' && currentUser?.isProfileComplete) {
      this.router.navigate(['/doctor/dashboard']);
    } else if (currentUser?.profileData) {
      this.profileForm.patchValue(currentUser.profileData);
    }
  }
  // Add these to your component
selectedDiplomaFile: File | null = null;

onDiplomaSelected(event: Event): void {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files[0]) {
    this.selectedDiplomaFile = input.files[0];
  }
}

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedFile = input.files[0];
      
      // Create preview
      const reader = new FileReader();
      reader.onload = () => {
        this.profileImagePreview = reader.result;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }
  // doctor-profile-form.component.ts
// doctor-profile-form.component.ts
async onSubmit(): Promise<void> {
  if (this.profileForm.invalid || !this.selectedDiplomaFile) {
    this.markAllAsTouched();
    this.errorMessage = !this.selectedDiplomaFile 
      ? 'Please upload your diploma file' 
      : 'Please fill all required fields correctly';
    return;
  }

  this.isLoading = true;
  this.errorMessage = '';

  try {
    const formData = new FormData();
    
    // Append form values
    formData.append('Speciality', this.profileForm.get('speciality')?.value);
    formData.append('Description', this.profileForm.get('description')?.value);
    formData.append('Diploma', this.profileForm.get('diploma')?.value);
    formData.append('IsGeneralist', this.profileForm.get('isGeneralist')?.value);
    formData.append('Phone', this.profileForm.get('phone')?.value);
    formData.append('WhatsappNumber', this.profileForm.get('whatsapp')?.value || '');
    formData.append('FacebookUrl', this.profileForm.get('facebook')?.value || '');
    formData.append('InstagramUrl', this.profileForm.get('instagram')?.value || '');
    formData.append('WebsiteUrl', this.profileForm.get('website')?.value || '');

    // Append files
    if (this.selectedFile) {
      formData.append('profilePhoto', this.selectedFile);
    }
    if (this.selectedDiplomaFile) {
      formData.append('diplomaFile', this.selectedDiplomaFile);
    }

    const response = await lastValueFrom(this.doctorService.completeProfile(formData));
    this.showSuccessMessage = true;
    
    setTimeout(() => this.router.navigate(['/doctor/dashboard']), 2000);
  } catch (error: any) {
    console.error('Error:', error);
    this.errorMessage = error.error?.message || 'Failed to update profile';
    if (error.error?.errors) {
      this.errorMessage = error.error.errors.map((e: any) => e.errorMessage).join(', ');
    }
  } finally {
    this.isLoading = false;
  }
}
/*
  onSubmit(): void {
    if (this.profileForm.invalid) {
      this.markAllAsTouched();
      this.errorMessage = 'Veuillez remplir tous les champs obligatoires correctement';
      return;
    }
  
    this.isLoading = true;
    this.errorMessage = '';
    const formData = new FormData();
  
    // Ajouter les champs du formulaire
    Object.keys(this.profileForm.value).forEach(key => {
      const value = this.profileForm.get(key)?.value;
      formData.append(key, value !== null ? value : '');
    });
  
    // Ajouter le fichier si sélectionné
    if (this.selectedFile) {
      formData.append('profilePhoto', this.selectedFile);
    }
  
    this.doctorService.completeProfile(formData).subscribe({
      next: (response: { user?: any; data?: any }) => {
        const userData = response.user || response.data || response;
        this.authService.updateUserProfile(userData);
        this.showSuccessMessage = true;
        setTimeout(() => {
          this.router.navigate(['/home']);
        }, 2000);
      },
      error: (err) => {
        console.error('Error:', err);
        this.errorMessage = err.error?.message || 'Erreur lors de la mise à jour du profil';
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }*/

  markAllAsTouched(): void {
    Object.values(this.profileForm.controls).forEach(control => {
      control.markAsTouched();
    });
  }

  isFieldInvalid(field: string): boolean {
    const control = this.profileForm.get(field);
    return control ? control.invalid && (control.touched || control.dirty) : false;
  }

  nextStep(): void {
    // Valider seulement les champs de l'étape actuelle avant de continuer
    if (this.currentStep === 1) {
      const step1Fields = ['speciality', 'description', 'diploma'];
      if (step1Fields.some(field => this.profileForm.get(field)?.invalid)) {
        this.markAllAsTouched();
        this.errorMessage = 'Veuillez remplir les informations professionnelles correctement';
        return;
      }
    }
    
    if (this.currentStep < 3) {
      this.currentStep++;
      this.errorMessage = '';
    }
  }

  prevStep(): void {
    if (this.currentStep > 1) {
      this.currentStep--;
      this.errorMessage = '';
    }
  }
}