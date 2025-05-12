import { Component, HostListener ,OnInit} from '@angular/core';
import { AuthService } from '../../features/auth/auth.service';
import { trigger, transition, style, animate } from '@angular/animations';
import { Router } from '@angular/router';
import { Location } from '@angular/common';



@Component({
  selector: 'app-header-appointment',
  standalone: false,
  templateUrl: './header-appointment.component.html',
  styleUrl: './header-appointment.component.scss',
  animations: [
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
export class HeaderAppointmentComponent implements OnInit  {
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
  isActive(path: string): boolean {
    return this.location.path() === path || 
           (path !== '/' && this.location.path().startsWith(path));
  }
  isMobileMenuOpen = false;

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    if (window.innerWidth > 991) {
      this.isMobileMenuOpen = false;
    }
  }

  // Dans votre composant Angular
toggleMobileMenu() {
  const menu = document.querySelector('.main-menu');
  const toggle = document.querySelector('.mobile-nav-toggle');
  
  if (menu) {
    menu.classList.toggle('show');
  }else if (toggle) {
  toggle.classList.toggle('active');
  
  // Empêcher le défilement du body quand le menu est ouvert
  document.body.style.overflow = menu && (menu as HTMLElement).classList.contains('show') ? 'hidden' : '';
}}
constructor(public authService: AuthService, private router: Router,   private location: Location
) {}

navigateToHome() {
  if (!this.authService.isLoggedIn()) {
    this.router.navigate(['/']);
  } else if (this.authService.isDoctor()) {
    this.router.navigate(['/doctor/dashboard']);
  } else if (this.authService.isPatient()) {
    this.router.navigate(['/patient/dashboard']);
  }
}

// Modifiez votre méthode isActive pour gérer le cas spécial de l'accueil
isActivee(route: string): boolean {
  if (route === '/') {
    if (this.authService.isDoctor()) {
      return this.router.url === '/doctor/dashboard';
    } else if (this.authService.isPatient()) {
      return this.router.url === '/patient/dashboard';
    }
    return this.router.url === '/';
  }
  return this.router.url.startsWith(route);
}


  get currentUser() {
    return this.authService.getCurrentUser();
  }

  get isLoggedIn() {
    return this.isLoggedInStatus; // Utilisez maintenant la propriété locale
  }
  
  // Ajoutez ce getter pour les utilisateurs non connectés
  get isLoggedOff() {
    return !this.isLoggedInStatus;
  }

  logout() {
    this.authService.logout();
    this.isLoggedInStatus = false;
  this.isMobileMenuOpen = false;
  this.router.navigate(['/login']);

  }
  navigateToDoctorRegistration() {
    this.router.navigate(['/register'], { queryParams: { role: 'Doctor' } });}
  navigateTo(route: string) {
      this.router.navigate([route]);
      this.isMobileMenuOpen = false; }
  }
/*
isLoggedIn = false;
  currentUser: any = null;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.checkAuthStatus();
  }

  checkAuthStatus() {
    this.isLoggedIn = this.authService.isAuthenticated();
    if (this.isLoggedIn) {
      this.currentUser = this.authService.getCurrentUser();
    }
  }

  logout() {
    this.authService.logout();
    this.isLoggedIn = false;
    this.currentUser = null;
  }
  */

