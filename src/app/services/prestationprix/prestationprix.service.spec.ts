import { TestBed } from '@angular/core/testing';

import { PrestationprixService } from './prestationprix.service';

describe('PrestationprixService', () => {
  let service: PrestationprixService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrestationprixService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
