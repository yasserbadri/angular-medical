import { Component } from '@angular/core';
import { AuthService } from '../../../core/auth.service';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService) {}

  onRegister() {
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Les mots de passe ne correspondent pas.';
      return;
    }

    this.authService.register(this.email, this.password).subscribe(
      response => {
        // Gérer la réponse du backend (par exemple, rediriger vers la page de connexion)
        console.log('Inscription réussie', response);
      },
      error => {
        // Gérer les erreurs (par exemple, afficher un message d'erreur)
        console.error('Inscription échouée', error);
        this.errorMessage = 'Une erreur est survenue lors de l\'inscription.';
      }
    );
  }
}
