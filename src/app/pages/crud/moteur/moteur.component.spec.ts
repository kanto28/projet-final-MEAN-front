import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoteurComponent } from './moteur.component';

describe('MoteurComponent', () => {
  let component: MoteurComponent;
  let fixture: ComponentFixture<MoteurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoteurComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
