import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorProfileFormComponent } from './doctor-profile-form.component';

describe('DoctorProfileFormComponent', () => {
  let component: DoctorProfileFormComponent;
  let fixture: ComponentFixture<DoctorProfileFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DoctorProfileFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctorProfileFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
