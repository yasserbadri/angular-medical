import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalServiceManagerComponent } from './medical-service-manager.component';

describe('MedicalServiceManagerComponent', () => {
  let component: MedicalServiceManagerComponent;
  let fixture: ComponentFixture<MedicalServiceManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MedicalServiceManagerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedicalServiceManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
