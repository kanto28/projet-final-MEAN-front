import { TestBed } from '@angular/core/testing';

import { PrxprestationService } from './prxprestation.service';

describe('PrxprestationService', () => {
  let service: PrxprestationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrxprestationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
