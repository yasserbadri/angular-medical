import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-home-doctor',
  standalone: false,
  templateUrl: './home-doctor.component.html',
  styleUrl: './home-doctor.component.scss'
})
export class HomeDoctorComponent {
  isLoggedInStatus = false;
  ngOnInit() {
    console.log("TEST CONNECTION  :  " , this.isLoggedIn)
    this.isLoggedInStatus = this.authService.isAuthenticated();
    this.checkAuthStatus();
    // S'abonner aux changements d'état d'authentification
    this.authService.currentUser$.subscribe(() => {
      this.checkAuthStatus();
    });
  }

  private checkAuthStatus() {
    this.isLoggedInStatus = this.authService.isAuthenticated();
  }
 
constructor(public authService: AuthService
) {}

  get currentUser() {
    return this.authService.getCurrentUser();
  }

  get isLoggedIn() {
    return this.isLoggedInStatus; // Utilisez maintenant la propriété locale
  }


  hours = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17];
  
  patients = [
    {
      name: 'Sophie Martin',
      avatar: 'assets/img/patient1.avif',
      lastVisit: '15/06/2023',
      bloodGroup: 'A+',
      prescriptions: 3
    },
    {
      name: 'Jean Dupont',
      avatar: 'assets/img/patient2.jpg',
      lastVisit: '14/06/2023',
      bloodGroup: 'O-',
      prescriptions: 5
    },
    {
      name: 'Marie Lambert',
      avatar: 'assets/img/patient3.avif',
      lastVisit: '12/06/2023',
      bloodGroup: 'B+',
      prescriptions: 2
    }
  ];

  getAppointment(hour: number): any {
    // Simulation de données
    if (hour === 10) {
      return {
        patientName: 'Jean Dupont',
        type: 'Consultation générale'
      };
    } else if (hour === 14) {
      return {
        patientName: 'Marie Lambert',
        type: 'Suivi post-opératoire'
      };
    }
    return null;
  }}