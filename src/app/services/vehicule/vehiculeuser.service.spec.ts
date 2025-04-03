import { TestBed } from '@angular/core/testing';

import { VehiculeuserService } from './vehiculeuser.service';

describe('VehiculeuserService', () => {
  let service: VehiculeuserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VehiculeuserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
