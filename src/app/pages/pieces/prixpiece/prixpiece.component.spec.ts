import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrixpieceComponent } from './prixpiece.component';

describe('PrixpieceComponent', () => {
  let component: PrixpieceComponent;
  let fixture: ComponentFixture<PrixpieceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrixpieceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrixpieceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
