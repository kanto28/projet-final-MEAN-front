import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffectationprestationComponent } from './affectationprestation.component';

describe('AffectationprestationComponent', () => {
  let component: AffectationprestationComponent;
  let fixture: ComponentFixture<AffectationprestationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AffectationprestationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AffectationprestationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
