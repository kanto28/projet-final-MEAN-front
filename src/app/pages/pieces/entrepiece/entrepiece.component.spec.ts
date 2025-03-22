import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntrepieceComponent } from './entrepiece.component';

describe('EntrepieceComponent', () => {
  let component: EntrepieceComponent;
  let fixture: ComponentFixture<EntrepieceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EntrepieceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EntrepieceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
