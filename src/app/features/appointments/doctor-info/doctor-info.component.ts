import { Component,Input } from '@angular/core';

@Component({
  selector: 'app-doctor-info',
  standalone: false,
  templateUrl: './doctor-info.component.html',
  styleUrl: './doctor-info.component.scss'
})
export class DoctorInfoComponent {
  @Input() doctorName: string = '';
  @Input() specialty: string = '';
  @Input() degree1: string = '';
  @Input() degree2: string = '';
  @Input() imageUrl: string = ''; // Pour l'image du docteur

  @Input() emailLink: string = '';
  @Input() callLink: string = '';
  @Input() itineraryLink: string = '';
  @Input() whatsappLink: string = '';

  @Input() facebookLink: string = '';
  @Input() instagramLink: string = '';
  @Input() websiteLink: string = '';
}
