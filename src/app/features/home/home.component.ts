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
  selectedTab: string = 'medecins';
  
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
      image: 'assets/img/uitilisteur.avif'
    }
  ];

  specialities = [
    { title: 'Cardiologie', description: 'Suivi cardiaque avancé', image: 'assets/img/Cardiologie.jpg' },
    { title: 'Pédiatrie', description: 'Soins pour enfants', image: 'assets/img/Pediatrie.jpg' },
    { title: 'Dermatologie', description: 'Soins de la peau', image: 'assets/img/Dermatologie.jpg' },
    { title: 'Gynécologie', description: 'Santé des femmes', image: 'assets/img/Gynécologie.jpg' },
    { title: 'Dentisterie', description: 'Soins dentaires complets', image: 'assets/img/Dentisterie.jpg' },
    { title: 'Psychiatrie', description: 'Santé mentale et bien-être', image: 'assets/img/Psychiatrie.jpg' },
    { title: 'Médecine générale', description: 'Soins médicaux généraux', image: 'assets/img/Médecine générale.png' }
  ];

  establishments = [
    { name: 'Clinique Carthage', location: 'Carthage', image: 'assets/img/CliniqueCarthage.jpg' },
    { name: 'Clinique La Rose', location: 'Lac2', image: 'assets/img/CliniqueLaRose.jpg' },
    { name: 'Clinique Pasteur', location: 'Tunis', image: 'assets/img/Clinique-Pasteur-Tunis.jpg' },
    { name: 'Polyclinique Les Jasmins', location: 'Les Jasmins', image: 'assets/img/PolycliniqueLesJasmins.jpg' }
  ];

  medicalNews = [
    { title: 'Nouvelles recommandations COVID', summary: 'Les dernières mesures sanitaires...', link: '#' },
    { title: 'Progrès en oncologie', summary: 'Des thérapies innovantes ont été testées...', link: '#' }
  ];

  testimonials = [
    { name: 'Sophie M.', comment: 'Un accueil chaleureux et des soins de qualité' },
    { name: 'Jean D.', comment: 'Très satisfait de la téléconsultation, rapide et efficace.' }
  ];

  features = [
    { 
      title: 'Rendez-vous en ligne', 
      description: 'Réservez vos consultations médicales 24/7',
      icon: 'fas fa-calendar-check'
    },
    { 
      title: 'Consultations vidéo', 
      description: 'Discutez avec votre médecin à distance',
      icon: 'fas fa-video'
    },
    { 
      title: 'Paiements sécurisés', 
      description: 'Payez en toute sécurité vos prestations',
      icon: 'fas fa-shield-alt'
    }
  ];

  tabs = [
    { id: 'medecins', label: 'Médecins', icon: '👨‍⚕️' },
    { id: 'douce', label: 'Médecine Douce', icon: '🍃' },
    { id: 'cliniques', label: 'Cliniques', icon: '🏥' }
  ];
  
  socialLinks = [
    { icon: 'fab fa-facebook-f', link: '#' },
    { icon: 'fab fa-youtube', link: '#' },
    { icon: 'fab fa-instagram', link: '#' },
    { icon: 'fab fa-linkedin-in', link: '#' },
    { icon: 'fab fa-x-twitter', link: '#' },
    { icon: 'fab fa-whatsapp', link: '#' }
  ];

  selectTab(tabId: string): void {
    this.selectedTab = tabId;
  }}