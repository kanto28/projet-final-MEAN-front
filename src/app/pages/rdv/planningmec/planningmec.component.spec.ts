import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanningmecComponent } from './planningmec.component';

describe('PlanningmecComponent', () => {
  let component: PlanningmecComponent;
  let fixture: ComponentFixture<PlanningmecComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlanningmecComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlanningmecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
