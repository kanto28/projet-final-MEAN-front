import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatutpresComponent } from './statutpres.component';

describe('StatutpresComponent', () => {
  let component: StatutpresComponent;
  let fixture: ComponentFixture<StatutpresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatutpresComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatutpresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
