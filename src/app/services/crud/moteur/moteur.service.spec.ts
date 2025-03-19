import { TestBed } from '@angular/core/testing';

import { MoteurService } from './moteur.service';

describe('MoteurService', () => {
  let service: MoteurService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MoteurService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
