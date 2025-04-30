import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  standalone: false,
})
export class RegisterComponent {
  registerForm: FormGroup;
  errorMessage: string = '';
  loading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['Patient', Validators.required]
    });
  }

  

  onSubmit() {
    if (this.registerForm.invalid) return;
  
    this.loading = true;
    this.errorMessage = '';
  
    this.authService.register(this.registerForm.value).subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.loading = false;
        
        // Affichage des erreurs détaillées du backend
        if (err.error?.errors) {
          this.errorMessage = Object.values(err.error.errors).flat().join('\n');
        } else {
          this.errorMessage = err.error?.message || 'Erreur lors de l\'inscription';
        }
      }
    });
  }}
