import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-header-appointment',
  standalone: false,
  templateUrl: './header-appointment.component.html',
  styleUrl: './header-appointment.component.scss'
})
export class HeaderAppointmentComponent {
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
}
