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

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }
}
