import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'], // N'oubliez pas d'ajouter cette ligne
  standalone: false,
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';
  loading = false;
  passwordVisible = false; // Pour la fonctionnalité show/hide password

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

  // Fonction pour basculer la visibilité du mot de passe
  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
  }

  onSubmit(): void {
    this.errorMessage = '';
    
    if (this.loginForm.invalid) {
      // Marquer tous les champs comme touchés pour afficher les erreurs
      this.loginForm.markAllAsTouched();
      return;
    }
  
    this.loading = true;
    
    const { email, password } = this.loginForm.value;
  
    this.authService.login(email, password).subscribe({
      next: (res) => {
        this.loading = false;
        // Redirection vers la page précédente ou la page d'accueil
        const redirectUrl = this.authService.redirectUrl || '/';
        this.router.navigate([redirectUrl]);
      },
      error: (err) => {
        this.loading = false;
        console.error('Erreur de connexion:', err);
        
        // Gestion des erreurs plus détaillée
        if (err.status === 0) {
          this.errorMessage = 'Impossible de se connecter au serveur. Vérifiez votre connexion internet.';
        } else if (err.status === 401) {
          this.errorMessage = 'Email ou mot de passe incorrect';
        } else if (err.status === 403) {
          this.errorMessage = 'Compte non activé. Veuillez vérifier vos emails.';
        } else {
          this.errorMessage = 'Une erreur est survenue. Veuillez réessayer plus tard.';
        }
      }
    });
  }

  // Méthode pour la connexion sociale (optionnelle)
  socialLogin(provider: string): void {
    console.log(`Tentative de connexion avec ${provider}`);
    // Implémentez la logique de connexion sociale ici
    // this.authService.socialLogin(provider).subscribe(...);
  }
}