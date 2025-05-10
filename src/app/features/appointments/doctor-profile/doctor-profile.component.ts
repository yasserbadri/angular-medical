import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../../doctors/doctor.service';

@Component({
  selector: 'app-doctor-profile',
  standalone: false,
  templateUrl: './doctor-profile.component.html',
  styleUrl: './doctor-profile.component.scss'
})
export class DoctorProfileComponent implements OnInit {
  doctors: any[] = [];
  currentIndex = 0;
  loading = true;
  error: string | null = null;

  constructor(private doctorService: DoctorService) {}

  ngOnInit(): void {
    this.loadDoctors();
  }

  loadDoctors(): void {
    this.loading = true;
    this.error = null;
    
    this.doctorService.getAllDoctors().subscribe({
      next: (data) => {
        this.doctors = this.transformDoctorsData(data);
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Échec du chargement des profils des médecins';
        this.loading = false;
        console.error('Error loading doctors:', err);
      }
    });
  }

  private transformDoctorsData(apiData: any[]): any[] {
    return apiData.map(doctor => ({
      id: doctor.id,
      name: `Dr. ${doctor.firstName} ${doctor.lastName}`,
      specialty: doctor.speciality || 'Généraliste',
      university: doctor.diploma || 'Diplôme non spécifié',
      degree: doctor.description || 'Médecin qualifié',
      photo: doctor.profilePhotoUrl || 'assets/images/default-doctor.png',
      contactInfo: {
        phone: doctor.phoneNumber,
        whatsapp: doctor.whatsappNumber,
        email: doctor.email
      },
      rating: doctor.rating || 4.8,
      reviewsCount: doctor.reviewsCount || 24
    }));
  }

  get currentDoctor(): any {
    return this.doctors[this.currentIndex];
  }

  nextDoctor(): void {
    if (this.currentIndex < this.doctors.length - 1) {
      this.currentIndex++;
    } else {
      this.currentIndex = 0; // Revenir au début si on est à la fin
    }
  }

  prevDoctor(): void {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    } else {
      this.currentIndex = this.doctors.length - 1; // Aller à la fin si on est au début
    }
  }

  contactViaWhatsApp(whatsappNumber: string) {
    if (whatsappNumber) {
      window.open(`https://wa.me/${whatsappNumber}`, '_blank');
    }
  }

  contactViaPhone(phoneNumber: string) {
    if (phoneNumber) {
      window.open(`tel:${phoneNumber}`, '_blank');
    }
  }

  contactViaEmail(email: string) {
    if (email) {
      window.open(`mailto:${email}`, '_blank');
    }
  }
}