import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MedicalServiceService } from '../medical-service/medical-service.service';

@Component({
  selector: 'app-medical-service-create',
  standalone: false,
  templateUrl: './medical-service-create.component.html',
  styleUrl: './medical-service-create.component.scss'
})
export class MedicalServiceCreateComponent {
  newService = {
    name: '',
    description: '',
    category: '',
    imageUrl: '',
    price: null,
    durationMinutes: 30
  };

  constructor(
    private medicalService: MedicalServiceService,
    private router: Router,
  ) {}

  onSubmit(): void {
    this.medicalService.createService(this.newService).subscribe({
        next: (response) => {
            this.router.navigate(['/services']);
        },
        error: (err) => {
            console.error('Detailed error:', err);
            // Affichez ce message à l'utilisateur
        }
    });
}

}
