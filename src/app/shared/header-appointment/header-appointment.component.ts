import { Component, HostListener ,OnInit} from '@angular/core';
import { AuthService } from '../../features/auth/auth.service';
import { trigger, transition, style, animate } from '@angular/animations';


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
export class HeaderAppointmentComponent implements OnInit {
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
  
}
