import { Component, OnInit } from '@angular/core';
import { MedicalServiceService } from './medical-service.service';

@Component({
  selector: 'app-medical-service',
  standalone: false,
  templateUrl: './medical-service.component.html',
  styleUrl: './medical-service.component.scss'
})
export class MedicalServiceComponent implements OnInit {
  services: any[] = [];
  categories: string[] = [];
  selectedCategory: string | null = null;

  constructor(private medicalService: MedicalServiceService) { }

  ngOnInit(): void {
    this.loadServices();
    this.loadCategories();
  }

  loadServices(): void {
    this.medicalService.getServices().subscribe(data => {
      this.services = data;
    });
  }

  loadCategories(): void {
    this.medicalService.getCategories().subscribe(data => {
      this.categories = data;
    });
  }

  filterByCategory(category: string | null): void {
    this.selectedCategory = category;
  }

  get filteredServices(): any[] {
    if (!this.selectedCategory) return this.services;
    return this.services.filter(s => s.category === this.selectedCategory);
  }
}
