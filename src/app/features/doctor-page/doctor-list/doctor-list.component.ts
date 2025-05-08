import { Component, OnInit } from '@angular/core';
import { DoctorPageService } from '../doctor-page.service';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';


@Component({
  selector: 'app-doctor-list',
  standalone: false,
  templateUrl: './doctor-list.component.html',
  styleUrl: './doctor-list.component.scss',
  animations: [
    trigger('staggerAnimation', [
      transition('* => *', [
        query(':enter', [
          style({ opacity: 0, transform: 'translateY(20px)' }),
          stagger('100ms', [
            animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
          ])
        ], { optional: true })
      ])
    ])]
})
export class DoctorListComponent  implements OnInit {
  doctors: any[] = [];
  uniqueSpecialities: string[] = [];
  loading = true;
  searchName = '';
  searchSpeciality = '';
  sortOption = 'name-asc';
  
  // Pagination
  currentPage = 1;
  itemsPerPage = 8;
  totalPages = 1;

  constructor(private doctorService: DoctorPageService) {}

  ngOnInit(): void {
    this.loadDoctors();
  }

  loadDoctors() {
    this.loading = true;
    this.doctorService.getAllDoctors().subscribe({
      next: (data) => {
        this.doctors = this.processDoctors(data);
        this.extractSpecialities();
        this.sortDoctors();
        this.calculatePagination();
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading doctors', err);
        this.loading = false;
      }
    });
  }

  processDoctors(doctors: any[]): any[] {
    return doctors.map(doctor => ({
      ...doctor,
      isAvailable: this.checkDoctorAvailability(doctor),
      ratingCount: doctor.ratingCount || Math.floor(Math.random() * 50) + 5
    }));
  }

  checkDoctorAvailability(doctor: any): boolean {
    // Implémentez votre logique de disponibilité ici
    return Math.random() > 0.3; // Exemple aléatoire
  }

  extractSpecialities() {
    const specialities = this.doctors.map(d => d.speciality);
    this.uniqueSpecialities = [...new Set(specialities)].sort();
  }

  searchByName() {
    if (this.searchName.trim()) {
      this.loading = true;
      this.doctorService.getDoctorsByName(this.searchName).subscribe({
        next: (data) => {
          this.doctors = this.processDoctors(data);
          this.sortDoctors();
          this.calculatePagination();
          this.loading = false;
        },
        error: (err) => {
          console.error('Error searching doctors', err);
          this.loading = false;
        }
      });
    } else {
      this.loadDoctors();
    }
  }

  searchBySpeciality() {
    if (this.searchSpeciality.trim()) {
      this.loading = true;
      this.doctorService.getDoctorsBySpeciality(this.searchSpeciality).subscribe({
        next: (data) => {
          this.doctors = this.processDoctors(data);
          this.sortDoctors();
          this.calculatePagination();
          this.loading = false;
        },
        error: (err) => {
          console.error('Error searching doctors', err);
          this.loading = false;
        }
      });
    } else {
      this.loadDoctors();
    }
  }

  sortDoctors() {
    switch (this.sortOption) {
      case 'name-asc':
        this.doctors.sort((a, b) => `${a.lastName} ${a.firstName}`.localeCompare(`${b.lastName} ${b.firstName}`));
        break;
      case 'name-desc':
        this.doctors.sort((a, b) => `${b.lastName} ${b.firstName}`.localeCompare(`${a.lastName} ${a.firstName}`));
        break;
      case 'speciality-asc':
        this.doctors.sort((a, b) => a.speciality.localeCompare(b.speciality));
        break;
    }
  }

  resetSearch() {
    this.searchName = '';
    this.searchSpeciality = '';
    this.loadDoctors();
  }

  handleImageError(event: any) {
    event.target.src = 'assets/default-avatar.png';
  }

  // Pagination methods
  calculatePagination() {
    this.totalPages = Math.ceil(this.doctors.length / this.itemsPerPage);
    this.currentPage = 1;
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  get paginatedDoctors() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.doctors.slice(start, end);
  }
}