import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderAppointmentComponent } from './header-appointment.component';

describe('HeaderAppointmentComponent', () => {
  let component: HeaderAppointmentComponent;
  let fixture: ComponentFixture<HeaderAppointmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderAppointmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
