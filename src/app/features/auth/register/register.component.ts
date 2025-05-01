import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  standalone: false,
})
export class RegisterComponent {
  registerForm: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';
  loading = false;
  passwordVisible = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['Patient', Validators.required],
      terms: [false, Validators.requiredTrue]
    });
  }

  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
  }

  onSubmit(): void {
    this.errorMessage = '';
    this.successMessage = '';

    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    this.loading = true;

    this.authService.register(this.registerForm.value).subscribe({
      next: (response) => {
        this.loading = false;
        this.successMessage = 'Inscription réussie ! Redirection en cours...';
        setTimeout(() => {
          this.router.navigate(['/login'], {
            queryParams: { registered: 'true' }
          });
        }, 1500);
      },
      error: (err) => {
        this.loading = false;
        console.error('Registration error:', err);
        
        if (err.error?.errors) {
          this.errorMessage = Object.values(err.error.errors).flat().join('\n');
        } else if (err.status === 409) {
          this.errorMessage = 'Un compte avec cet email existe déjà';
        } else {
          this.errorMessage = err.error?.message || 'Une erreur est survenue lors de l\'inscription';
        }
      }
    });
  }

  socialRegister(provider: string): void {
    console.log(`Tentative d'inscription avec ${provider}`);
    // Implémentez la logique d'inscription sociale ici
    // this.authService.socialRegister(provider).subscribe(...);
  }
}