import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtatstockpieceComponent } from './etatstockpiece.component';

describe('EtatstockpieceComponent', () => {
  let component: EtatstockpieceComponent;
  let fixture: ComponentFixture<EtatstockpieceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EtatstockpieceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EtatstockpieceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
