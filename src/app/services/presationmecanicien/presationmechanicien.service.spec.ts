import { TestBed } from '@angular/core/testing';

import { PresationmechanicienService } from './presationmechanicien.service';

describe('PresationmechanicienService', () => {
  let service: PresationmechanicienService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PresationmechanicienService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
