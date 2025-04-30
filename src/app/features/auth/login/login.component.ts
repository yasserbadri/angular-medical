import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: false,
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';
  loading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    this.errorMessage = '';
    
    if (this.loginForm.invalid) {
      return;
    }
  
    this.loading = true;
    
    const { email, password } = this.loginForm.value;
  
    this.authService.login(email, password).subscribe({
      next: (res) => {
        this.loading = false;
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.loading = false;
        console.error('Erreur complète:', err);
        
        // Message d'erreur plus précis
        if (err.status === 401) {
          this.errorMessage = 'Email ou mot de passe incorrect';
        } else {
          this.errorMessage = 'Erreur de connexion. Veuillez réessayer.';
        }
      }
    });
  }
}
