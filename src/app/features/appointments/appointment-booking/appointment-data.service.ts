import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppointmentDataService {
    private appointmentDate: string | null = null;

  private appointmentDateSubject = new BehaviorSubject<string | null>(null);
  public appointmentDate$ = this.appointmentDateSubject.asObservable();

  constructor() {}

  setAppointmentDate(date: string): void {
    this.appointmentDate = date;
    console.log('Date de rendez-vous définie :', date);  // Ajout du log pour vérifier
  }

   // Cette méthode permet de récupérer la date de rendez-vous
   getAppointmentDate(): string | null {
    return this.appointmentDate;
  }
}
