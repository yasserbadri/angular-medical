import { Component, OnInit } from '@angular/core';
import { DoctorPageService } from '../doctor-page.service';
import { AuthService } from '../../auth/auth.service';
import { AppointmentDataService } from '../../appointments/appointment-booking/appointment-data.service';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.scss'],
  standalone: false
})
export class PatientListComponent implements OnInit {
  patients: any[] = [];
  error: string = '';
  doctorId: string | null = null;
  appointmentDate: string | null = null; 
  loading: boolean = false; // Ajout de la propriété loading


  constructor(
    private patientService: DoctorPageService,
    private authService: AuthService  ,
    private appointmentDataService: AppointmentDataService
  ) {}

  ngOnInit(): void {
    this.checkDoctorAndLoadPatients(); 
    this.loadAppointmentDate(); 
  }

  
   loadAppointmentDate(): void {
    this.appointmentDate = this.appointmentDataService.getAppointmentDate();  // Récupère la date du service
    if (!this.appointmentDate) {
      console.log('Aucune date de rendez-vous trouvée.');
    } else {
      console.log('Date de rendez-vous récupérée :', this.appointmentDate);  // Log pour vérifier la date
    }
  }

  checkDoctorAndLoadPatients(): void {
    const currentUser = this.authService.getCurrentUser();  

    if (currentUser && currentUser.role === 'Doctor') {
      this.doctorId = currentUser.id; 
      if (this.doctorId) {
        this.loadPatients();  
      } else {
        this.error = 'Aucun ID de docteur trouvé.';
      }
    } else {
      this.error = 'L\'utilisateur n\'est pas un docteur.';
    }
  }

  
  loadPatients(): void {
    if (this.doctorId) {
      this.patientService.getPatientsByDoctorId(this.doctorId).subscribe({
        next: (data) => {
          this.patients = data;
        },
        error: (err) => {
          this.error = 'Erreur lors du chargement des patients';
          console.error('Error loading patients:', err);
        }
      });
    } else {
      this.error = 'Aucun docteur connecté.';
    }
  }
  retryLoading(): void {
    this.loading = true;
    this.error = ''; // Réinitialiser l'erreur avant de tenter de charger à nouveau
    this.loadPatients();
  }
}
