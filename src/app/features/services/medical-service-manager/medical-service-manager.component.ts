import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MedicalServiceService } from './../medical-service/medical-service.service';

@Component({
  selector: 'app-medical-service-manager',
  standalone: false,
  templateUrl: './medical-service-manager.component.html',
  styleUrl: './medical-service-manager.component.scss'
})
export class MedicalServiceManagerComponent implements OnInit {
  serviceForm: FormGroup;
  isEditMode = false;
  currentServiceId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private medicalService: MedicalServiceService,
    private route: ActivatedRoute,
    public router: Router
  ) {
    this.serviceForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      category: ['', Validators.required],
      imageUrl: [''],
      price: [null],
      durationMinutes: [30, [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.currentServiceId = +params['id'];
        this.loadServiceData(this.currentServiceId);
      }
    });
  }

  loadServiceData(id: number): void {
    this.medicalService.getService(id).subscribe({
      next: (service) => {
        this.serviceForm.patchValue(service);
      },
      error: (err) => {
        console.error('Error loading service:', err);
        // Gérer l'erreur (redirection ou message)
      }
    });
  }

  onSubmit(): void {
    if (this.serviceForm.invalid) {
      return;
    }

    const serviceData = this.serviceForm.value;

    if (this.isEditMode && this.currentServiceId) {
      this.medicalService.updateService(this.currentServiceId, serviceData).subscribe({
        next: () => {
          this.router.navigate(['/services']);
          // Afficher un message de succès
        },
        error: (err) => {
          console.error('Error updating service:', err);
          // Afficher un message d'erreur
        }
      });
    } else {
      this.medicalService.createService(serviceData).subscribe({
        next: () => {
          this.router.navigate(['/services']);
          // Afficher un message de succès
        },
        error: (err) => {
          console.error('Error creating service:', err);
          // Afficher un message d'erreur
        }
      });
    }
  }

  onDelete(): void {
    if (!this.currentServiceId) return;

    if (confirm('Êtes-vous sûr de vouloir supprimer ce service ?')) {
      this.medicalService.deleteService(this.currentServiceId).subscribe({
        next: () => {
          this.router.navigate(['/services']);
          // Afficher un message de succès
        },
        error: (err) => {
          console.error('Error deleting service:', err);
          // Afficher un message d'erreur
        }
      });
    }
  }
  navigateToServices(): void {
    this.router.navigate(['/services']);
}
}
