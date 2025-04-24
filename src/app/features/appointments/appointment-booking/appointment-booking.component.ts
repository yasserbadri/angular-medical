import { Component } from '@angular/core';

@Component({
  selector: 'app-appointment-booking',
  standalone: false,
  templateUrl: './appointment-booking.component.html',
  styleUrl: './appointment-booking.component.scss'
})
export class AppointmentBookingComponent {
  appointmentType = 'cabinet';
  timeSlots = [
    '09:00', '09:15', '09:30', '09:45', '10:00', '10:15', '10:30', '10:45',
    '11:00', '11:15', '11:30', '11:45', '12:00', '12:15', '12:30', '12:45',
    '13:00', '13:15', '13:30', '13:45', '14:00', '14:15', '14:30', '14:45',
    '15:00', '15:15', '15:30', '15:45', '16:00', '16:15', '16:30', '16:45',
    '17:00'
  ];
  showAllSlots = false;
  
  get visibleSlots() {
    return this.showAllSlots ? this.timeSlots : this.timeSlots.slice(0, 5);
  }
  
  toggleSlotsVisibility() {
    this.showAllSlots = !this.showAllSlots;
  }  startOfWeek: Date = new Date();
  weekDates: Date[] = [];
  selectedSlot: { day: Date, hour: string } | null = null;

  ngOnInit() {
    this.calculateWeek();
  }

  calculateWeek() {
    const current = new Date(this.startOfWeek);
    const day = current.getDay();
    const diff = current.getDate() - day + (day === 0 ? -6 : 1); // start on Monday
    const monday = new Date(current.setDate(diff));
    this.weekDates = [];

    for (let i = 0; i < 7; i++) {
      const nextDay = new Date(monday);
      nextDay.setDate(monday.getDate() + i);
      this.weekDates.push(nextDay);
    }
  }

  previousWeek() {
    this.startOfWeek.setDate(this.startOfWeek.getDate() - 7);
    this.calculateWeek();
  }

  nextWeek() {
    this.startOfWeek.setDate(this.startOfWeek.getDate() + 7);
    this.calculateWeek();
  }

  isSlotAvailable(day: Date, hour: string): boolean {
    // Mock: disable random slots for demo
    return !(day.getDay() === 0 || day.getDay() === 6); // closed on weekends
  }

  selectSlot(day: Date, hour: string) {
    this.selectedSlot = { day, hour };
  }

  isSelected(day: Date, hour: string): boolean {
    return this.selectedSlot?.day.toDateString() === day.toDateString() && this.selectedSlot?.hour === hour;
  }
}
