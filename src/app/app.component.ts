import { Component } from '@angular/core';
import { AuthService } from './features/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  isSidebarCollapsed = false; // Ajoutez cette propriété

  constructor(public authService: AuthService) {} // Injectez le service
  get isDoctor(): boolean {
    return this.authService.isDoctor();
  }
  title = 'medical-appointment-v1';
}
