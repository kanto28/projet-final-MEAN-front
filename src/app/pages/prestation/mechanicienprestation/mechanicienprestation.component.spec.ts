import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MechanicienprestationComponent } from './mechanicienprestation.component';

describe('MechanicienprestationComponent', () => {
  let component: MechanicienprestationComponent;
  let fixture: ComponentFixture<MechanicienprestationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MechanicienprestationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MechanicienprestationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
