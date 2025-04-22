import { Component } from '@angular/core';
import { AuthService } from '../../../core/auth.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'] // Attention à l'orthographe de "styleUrls"
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService) {}

  // Méthode pour valider l'email
  isValidEmail(): boolean {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return regex.test(this.email);
  }

  // Méthode pour gérer la soumission du formulaire
  onLogin() {
    if (this.isValidEmail() && this.password.length >= 6) {
      this.authService.login(this.email, this.password).subscribe(
        response => {
          // Gérer la réponse du backend (par exemple, stocker le token JWT)
          console.log('Login successful', response);
          // Sauvegarde le token JWT dans le localStorage ou sessionStorage
          localStorage.setItem('token', response.token);
        },
        error => {
          // Gérer les erreurs (par exemple, afficher un message d'erreur)
          console.error('Login failed', error);
        }
      );
    } else {
      // Si le formulaire est invalide, ne rien faire
      console.error('Formulaire invalide');
    }
  }
}
