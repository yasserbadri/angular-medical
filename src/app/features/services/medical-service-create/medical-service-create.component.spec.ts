import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalServiceCreateComponent } from './medical-service-create.component';

describe('MedicalServiceCreateComponent', () => {
  let component: MedicalServiceCreateComponent;
  let fixture: ComponentFixture<MedicalServiceCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MedicalServiceCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedicalServiceCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
