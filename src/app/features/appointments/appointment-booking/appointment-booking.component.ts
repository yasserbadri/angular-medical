import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../appointments.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-appointment-booking',
  standalone: false,
  templateUrl: './appointment-booking.component.html',
  styleUrl: './appointment-booking.component.scss'
})
export class AppointmentBookingComponent implements OnInit {
  doctors: any[] = [];
  selectedDoctor: any = null;
  appointmentForm: FormGroup;
  availableSlots: any[] = [];
  loading = false;
  today = new Date().toISOString().split('T')[0];

  constructor(
    private appointmentService: AppointmentService,  private authService: AuthService, // Ajoutez ce service
    
    private fb: FormBuilder
  ) {
    this.appointmentForm = this.fb.group({
      doctorId: ['', Validators.required],
      date: ['', Validators.required],
      time: ['', Validators.required],
      description: [''],
      appointmentType: ['cabinet', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadDoctors();
  }

  loadDoctors(): void {
    this.loading = true;
    this.appointmentService.getAvailableDoctors().subscribe({
      next: (doctors) => {
        this.doctors = doctors;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading doctors', err);
        this.loading = false;
      }
    });
  }

  onDoctorSelect(): void {
    const doctorId = this.appointmentForm.get('doctorId')?.value;
    this.selectedDoctor = this.doctors.find(d => d.id === doctorId);
    if (this.appointmentForm.get('date')?.value) {
      this.loadAvailability();
    }
  }

  onDateSelect(): void {
    if (this.appointmentForm.get('doctorId')?.value) {
      this.loadAvailability();
    }
  }

  loadAvailability(): void {
    const date = this.appointmentForm.get('date')?.value;
    const doctorId = this.appointmentForm.get('doctorId')?.value;
    
    if (!date || !doctorId) return;

    this.loading = true;
    this.availableSlots = [];
    this.appointmentForm.get('time')?.reset();

    this.appointmentService.getDoctorAvailability(
      doctorId,
      new Date(date)
    ).subscribe({
      next: (slots) => {
        this.availableSlots = slots;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading availability', err);
        this.loading = false;
      }
    });
  }

  onSubmit(): void {
    if (this.appointmentForm.invalid) return;

    const currentUser = this.authService.getCurrentUser(); // Récupérer l'utilisateur connecté
    if (!currentUser) {
      alert('Vous devez être connecté pour prendre un rendez-vous.');
      return;
    }
  
    if (this.appointmentForm.invalid) return;

    const formValue = this.appointmentForm.value;
    const appointmentDateTime = new Date(formValue.date);
    const [hours, minutes] = formValue.time.split(':');
    appointmentDateTime.setHours(parseInt(hours), parseInt(minutes));

    const appointmentData = {
      patientId: currentUser.id, // Utilisez l'ID de l'utilisateur connecté

      doctorId: formValue.doctorId,
      date: appointmentDateTime.toISOString(),
      description: formValue.description,
      appointmentType: formValue.appointmentType
    };

    this.loading = true;
    this.appointmentService.createAppointment(appointmentData).subscribe({
      next: (response) => {
        alert('Rendez-vous créé avec succès!');
        this.loading = false;
        this.appointmentForm.reset({
          appointmentType: 'cabinet'
        });
        this.selectedDoctor = null;
        this.availableSlots = [];
      },
      error: (err) => {
        console.error('Error creating appointment', err);
        this.loading = false;
      }
    });
  }
}