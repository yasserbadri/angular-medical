import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarRdvComponent } from './calendar-rdv.component';

describe('CalendarRdvComponent', () => {
  let component: CalendarRdvComponent;
  let fixture: ComponentFixture<CalendarRdvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CalendarRdvComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalendarRdvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
