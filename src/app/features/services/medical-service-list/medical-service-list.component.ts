import { Component, OnInit } from '@angular/core';
import { MedicalServiceService } from '../medical-service/medical-service.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-medical-service-list',
  standalone: false,
  templateUrl: './medical-service-list.component.html',
  styleUrl: './medical-service-list.component.scss'
})
export class MedicalServiceListComponent implements OnInit {
  services: any[] = [];
  loading = true;
  displayedColumns: string[] = ['name', 'description', 'category', 'duration', 'price', 'actions'];

  constructor(
    private medicalService: MedicalServiceService,
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadServices();
  }

  loadServices(): void {
    this.loading = true;
    this.medicalService.getServices().subscribe({
      next: (data) => {
        this.services = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading services:', err);
        this.loading = false;
        this.showError('Échec du chargement des services');
      }
    });
  }

  editService(id: number): void {
    this.router.navigate(['/services/edit', id]);
  }

  confirmDelete(id: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: {
        title: 'Confirmation',
        message: 'Êtes-vous sûr de vouloir supprimer ce service?',
        confirmText: 'Supprimer',
        cancelText: 'Annuler'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteService(id);
      }
    });
  }

  private deleteService(id: number): void {
    this.medicalService.deleteService(id).subscribe({
      next: () => {
        this.showSuccess('Service supprimé avec succès');
        this.loadServices();
      },
      error: (err) => {
        console.error('Error deleting service:', err);
        this.showError('Échec de la suppression du service');
      }
    });
  }

  private showSuccess(message: string): void {
    this.snackBar.open(message, 'Fermer', {
      duration: 3000,
      panelClass: ['success-snackbar']
    });
  }

  private showError(message: string): void {
    this.snackBar.open(message, 'Fermer', {
      duration: 3000,
      panelClass: ['error-snackbar']
    });
  }
}