import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Appointment {
  id?: number;
  date: string;
  patientId: number;
  
  doctorId: number;
  description: string;
  status: string;
}
interface AppointmentRequest {
  date: string;
  patientId: number;
  doctorId: number;
  description?: string; // Optionnel
  status?: string; // Optionnel
}

@Component({
  selector: 'app-appointments',
  standalone: false,
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.scss']
})
export class AppointmentsComponent implements OnInit {
  appointments: Appointment[] = [];
  apiUrl = 'http://localhost:5278/api/appointments';

  // Formulaire temporaire
  formData: Appointment = {
    date: '',
    patientId: 0,
    
    doctorId: 0,
    description: '',
    status: 'Scheduled'
  };

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchAppointments();
  }

  fetchAppointments(): void {
    this.http.get<Appointment[]>(this.apiUrl).subscribe({
      next: data => this.appointments = data,
      error: err => console.error('Erreur lors du chargement des rendez-vous :', err)
    });
  }

  deleteAppointment(id: number): void {
    if (confirm('Confirmer la suppression de ce rendez-vous ?')) {
      this.http.delete(`${this.apiUrl}/${id}`).subscribe({
        next: () => this.fetchAppointments(),
        error: err => console.error('Erreur lors de la suppression :', err)
      });
    }
  }

  /*onSubmit(): void {
    if (this.formData.id) {
      // Modification
      this.http.put(`${this.apiUrl}/${this.formData.id}`, this.formData).subscribe({
        next: () => {
          this.resetForm();
          this.fetchAppointments();
        },
        error: err => console.error('Erreur lors de la modification :', err)
      });
    } else {
      // Création
      this.http.post(this.apiUrl, this.formData).subscribe({
        next: () => {
          this.resetForm();
          this.fetchAppointments();
        },
        error: err => console.error('Erreur lors de l\'ajout :', err)
      });
    }
  }*/
    onSubmit(): void {
      // Validez les données du formulaire
      if (!this.formData.date || !this.formData.patientId || !this.formData.doctorId) {
        alert('Veuillez remplir tous les champs obligatoires');
        return;
      }
    
      // Préparez la requête
      const request = {
        date: new Date(this.formData.date).toISOString(),
        patientId: this.formData.patientId,
        doctorId: this.formData.doctorId,
        description: this.formData.description || '', // Valeur par défaut si vide
        status: this.formData.status || 'Scheduled'
      };
    
      console.log('Envoi des données:', request);
    
      // Envoi au backend
      const observable = this.formData.id 
        ? this.http.put(`${this.apiUrl}/${this.formData.id}`, request)
        : this.http.post(this.apiUrl, request);
    
      observable.subscribe({
        next: () => {
          this.resetForm();
          this.fetchAppointments();
          alert('Opération réussie!');
        },
        error: (err) => {
          console.error('Erreur:', err);
          alert(`Erreur: ${err.message}`);
          if (err.error) {
            console.error('Détails:', err.error);
          }
        }
      });
    }

  editAppointment(appointment: Appointment): void {
    this.formData = { ...appointment };
  }

  resetForm(): void {
    this.formData = {
      date: '',
      patientId: 0,
     

      doctorId: 0,
      description: '',
      status: 'Scheduled'
    };
  }
}
