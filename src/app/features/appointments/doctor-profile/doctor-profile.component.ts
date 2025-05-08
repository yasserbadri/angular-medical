import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DoctorService } from '../../doctors/doctor.service';

@Component({
  selector: 'app-doctor-profile',
  standalone: false,
  templateUrl: './doctor-profile.component.html',
  styleUrl: './doctor-profile.component.scss'
})
export class DoctorProfileComponent  implements OnInit {
  doctor: any;
  loading = true;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private doctorService: DoctorService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const doctorId = params['id'];
      this.loadDoctor(doctorId);
    });
  }

  loadDoctor(id: string): void {
    this.loading = true;
    this.error = null;
    
    this.doctorService.getDoctorById(id).subscribe({
      next: (data) => {
        this.doctor = this.transformDoctorData(data);
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Échec du chargement du profil. Veuillez réessayer plus tard.';
        this.loading = false;
        console.error('Error loading doctor:', err);
      }
    });
  }

  private transformDoctorData(apiData: any): any {
    return {
      id: apiData.id,
      name: `Dr. ${apiData.firstName} ${apiData.lastName}`,
      specialty: apiData.speciality || 'Généraliste',
      university: apiData.diploma || 'Diplôme non spécifié',
      degree: apiData.description || 'Médecin qualifié',
      photo: apiData.profilePhotoUrl || 'assets/images/utilisateurConnecte.png',
      contactInfo: {
        phone: apiData.phoneNumber,
        whatsapp: apiData.whatsappNumber,
        email: apiData.email
      },
      rating: apiData.rating || 4.8,
      reviewsCount: apiData.reviewsCount || 24
    };
  }

  contactViaWhatsApp() {
    if (this.doctor?.contactInfo?.whatsapp) {
      window.open(`https://wa.me/${this.doctor.contactInfo.whatsapp}`, '_blank');
    }
  }

  contactViaPhone() {
    if (this.doctor?.contactInfo?.phone) {
      window.open(`tel:${this.doctor.contactInfo.phone}`, '_blank');
    }
  }

  contactViaEmail() {
    if (this.doctor?.contactInfo?.email) {
      window.open(`mailto:${this.doctor.contactInfo.email}`, '_blank');
    }
  }
}