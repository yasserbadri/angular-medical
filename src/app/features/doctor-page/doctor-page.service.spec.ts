import { TestBed } from '@angular/core/testing';

import { DoctorPageService } from './doctor-page.service';

describe('DoctorPageService', () => {
  let service: DoctorPageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DoctorPageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
