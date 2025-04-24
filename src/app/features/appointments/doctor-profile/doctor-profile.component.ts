import { Component } from '@angular/core';

@Component({
  selector: 'app-doctor-profile',
  standalone: false,
  templateUrl: './doctor-profile.component.html',
  styleUrl: './doctor-profile.component.scss'
})
export class DoctorProfileComponent {
  doctor = {
    name: 'Dr. Gharbi Hatem',
    specialty: 'Généraliste',
    university: 'Médecin de faculté de médecine de tunis',
    degree: 'Diplomé docteur en médecine de la faculté de médecine de Tunis',
    photo: 'assets/doctor.png',
    contactMethods: [
      { type: 'Email', icon: '📧', color: 'border-blue-500', style: 'text-blue-700' },
      { type: 'Appel', icon: '📞', color: 'border-green-500', style: 'text-green-700' },
      { type: 'Itinéraire', icon: '📍', color: 'border-red-500', style: 'text-red-700' },
      { type: 'WhatsApp', icon: '💬', color: 'border-green-400', style: 'text-green-600' }
    ]
  };

}
