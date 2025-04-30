import { Component } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
  ,animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('800ms ease-in', style({ opacity: 1 }))
      ])
    ]),
    trigger('slideInUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(40px)' }),
        animate('600ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class HomeComponent {
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



/*import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: false  // <-- Assurez-vous que c'est bien false

})
export class HomeComponent {
  selectedTab = 'medecins';
  searchQuery = '';
  selectedGovernorate = '';
  selectedSpecialty = '';
  specialities = [
    { title: 'Cardiologie', description: 'Suivi cardiaque avancé', image: 'assets/img/cardio.jpg' },
    { title: 'Pédiatrie', description: 'Soins pour enfants', image: 'assets/img/pediatrie.jpg' },
    { title: 'Dermatologie', description: 'Soins de la peau', image: 'assets/img/dermato.jpg' },
  ];
  governorates = [
    'Ariana', 'Béja', 'Ben Arous', 'Bizerte', 'Gabès',
    'Gafsa', 'Jendouba', 'Kairouan', 'Kasserine', 'Kébili',
    'Le Kef', 'Mahdia', 'Manouba', 'Médenine', 'Monastir',
    'Nabeul', 'Sfax', 'Sidi Bouzid', 'Siliana', 'Sousse',
    'Tataouine', 'Tozeur', 'Tunis', 'Zaghouan'
  ];

  features = [
    {
      icon: 'fas fa-calendar-check',
      title: 'Rendez-vous en ligne',
      description: 'Réservez vos consultations médicales 24h/24 et 7j/7 en quelques clics'
    },
    {
      icon: 'fas fa-video',
      title: 'Téléconsultation',
      description: 'Consultez un médecin à distance sans vous déplacer'
    },
    {
      icon: 'fas fa-shield-alt',
      title: 'Paiements sécurisés',
      description: 'Paiement en ligne crypté et protégé'
    }
  ];

  doctors = [
    {
      id: 1,
      name: 'Dr Bouaziz Safouen',
      speciality: 'ORL Et Stomatologue',
      city: 'Sfax',
      zone: 'Sfax Ville',
      image: 'assets/images/homme.avif',
      rating: 4.8,
      availableToday: true
    },
    {
      id: 2,
      name: 'Dr Akrout Manal',
      speciality: 'Endocrinologue',
      city: 'Sfax',
      zone: 'Sfax Ville',
      image: 'assets/images/femme.avif',
      rating: 4.9,
      availableToday: false
    },
    {
      id: 3,
      name: 'Dr Ben Ammar Ahmed',
      speciality: 'Cardiologue',
      city: 'Tunis',
      zone: 'Lac 1',
      image: 'assets/images/doctor3.jpg',
      rating: 4.7,
      availableToday: true
    }
  ];

  /*specialities = [
    {
      id: 1,
      title: 'Cardiologie',
      description: 'Prévention et traitement des maladies cardiovasculaires',
      icon: 'fas fa-heartbeat',
      color: 'linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)'
    },
    {
      id: 2,
      title: 'Pédiatrie',
      description: 'Soins médicaux spécialisés pour les enfants',
      icon: 'fas fa-baby',
      color: 'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)'
    },
    {
      id: 3,
      title: 'Dermatologie',
      description: 'Diagnostic et traitement des maladies de la peau',
      icon: 'fas fa-allergies',
      color: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)'
    },
    {
      id: 4,
      title: 'Gynécologie',
      description: 'Santé féminine et suivi gynécologique',
      icon: 'fas fa-female',
      color: 'linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)'
    }
  ];
*//*
  testimonials = [
    {
      name: 'Sophie M.',
      comment: 'Très satisfaite de la rapidité de prise en charge. Le médecin était à l\'écoute et professionnel.',
      avatar: 'assets/images/avatar1.jpg',
      date: '15/03/2023'
    },
    {
      name: 'Jean D.',
      comment: 'Service exceptionnel, j\'ai pu obtenir un rendez-vous le jour même pour mon enfant. Je recommande vivement !',
      avatar: 'assets/images/avatar2.jpg',
      date: '22/03/2023'
    },
    {
      name: 'Amira K.',
      comment: 'La téléconsultation m\'a permis d\'éviter un déplacement inutile. Très pratique et efficace.',
      avatar: 'assets/images/avatar3.jpg',
      date: '10/04/2023'
    }
  ];

  constructor(private router: Router) {}

  selectTab(tab: string): void {
    this.selectedTab = tab;
  }

  search(): void {
    if (this.searchQuery.trim() || this.selectedGovernorate || this.selectedSpecialty) {
      this.router.navigate(['/search'], {
        queryParams: {
          q: this.searchQuery,
          governorate: this.selectedGovernorate,
          specialty: this.selectedSpecialty,
          type: this.selectedTab
        }
      });
    }
  }
}*/