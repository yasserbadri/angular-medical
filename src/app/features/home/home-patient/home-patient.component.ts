import { Component } from '@angular/core';

@Component({
  selector: 'app-home-patient',
  standalone: false,
  templateUrl: './home-patient.component.html',
  styleUrl: './home-patient.component.scss'
})
export class HomePatientComponent {
  features = [
    { title: 'Rendez-vous en ligne', description: 'Réservez vos consultations médicales 24/7.' },
    { title: 'Consultations vidéo', description: 'Discutez avec votre médecin à distance.' },
    { title: 'Paiements sécurisés', description: 'Payez en toute sécurité vos prestations.' }
  ];
  selectedTab = 'medecins';

  selectTab(tab: string) {
    this.selectedTab = tab;
  }
  doctors = [
    {
      name: 'Dr Bouaziz Safouen',
      speciality: 'ORL Et Stomatologue',
      city: 'Sfax',
      zone: 'Sfax Ville',
      image: '../assets/img/utilisateurConnecte.png'
    },
    {
      name: 'Dr Akrout Manal',
      speciality: 'Endocrinologue',
      city: 'Sfax',
      zone: 'Sfax Ville',
      image: 'assets/img/femme.avif'
    }
  ];

  specialities = [
    { title: 'Cardiologie', description: 'Suivi cardiaque avancé', image: 'assets/img/cardio.jpg' },
    { title: 'Pédiatrie', description: 'Soins pour enfants', image: 'assets/img/pediatrie.jpg' },
    { title: 'Dermatologie', description: 'Soins de la peau', image: 'assets/img/dermato.jpg' },
  ];

  establishments = [
    { name: 'Clinique du Parc', location: 'Paris 15', image: 'assets/img/clinic1.jpg' },
    { name: 'Centre Médical Soleil', location: 'Lyon', image: 'assets/img/clinic2.jpg' },
  ];

  medicalNews = [
    { title: 'Nouvelles recommandations COVID', summary: 'Les dernières mesures sanitaires...', link: '#' },
    { title: 'Progrès en oncologie', summary: 'Des thérapies innovantes ont été testées...', link: '#' }
  ];

  testimonials = [
    { name: 'Sophie M.', comment: 'Un accueil chaleureux et des soins de qualité ' },
    { name: 'Jean D.', comment: 'Très satisfait de la téléconsultation, rapide et efficace.' }
  ];

  
}





