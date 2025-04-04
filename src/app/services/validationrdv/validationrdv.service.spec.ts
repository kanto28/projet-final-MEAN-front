import { TestBed } from '@angular/core/testing';

import { ValidationrdvService } from './validationrdv.service';

describe('ValidationrdvService', () => {
  let service: ValidationrdvService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValidationrdvService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
