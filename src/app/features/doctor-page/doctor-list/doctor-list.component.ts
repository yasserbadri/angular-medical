import { Component, OnInit } from '@angular/core';
import { DoctorPageService } from '../doctor-page.service';

@Component({
  selector: 'app-doctor-list',
  standalone: false,
  templateUrl: './doctor-list.component.html',
  styleUrl: './doctor-list.component.scss'
})
export class DoctorListComponent  implements OnInit {
  doctors: any[] = [];
  searchName: string = '';
  searchSpeciality: string = '';

  constructor(private doctorService: DoctorPageService) {}

  ngOnInit(): void {
    this.loadDoctors();
  }

  loadDoctors() {
    this.doctorService.getAllDoctors().subscribe(data => this.doctors = data);
  }

  searchByName() {
    if (this.searchName.trim()) {
      this.doctorService.getDoctorsByName(this.searchName).subscribe(data => this.doctors = data);
    } else {
      this.loadDoctors();
    }
  }

  searchBySpeciality() {
    if (this.searchSpeciality.trim()) {
      this.doctorService.getDoctorsBySpeciality(this.searchSpeciality).subscribe(data => this.doctors = data);
    } else {
      this.loadDoctors();
    }
  }
}