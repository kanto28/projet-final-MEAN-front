import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PieceprestationComponent } from './pieceprestation.component';

describe('PieceprestationComponent', () => {
  let component: PieceprestationComponent;
  let fixture: ComponentFixture<PieceprestationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PieceprestationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PieceprestationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
