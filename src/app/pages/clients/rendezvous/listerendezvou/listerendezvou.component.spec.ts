import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListerendezvouComponent } from './listerendezvou.component';

describe('ListerendezvouComponent', () => {
  let component: ListerendezvouComponent;
  let fixture: ComponentFixture<ListerendezvouComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListerendezvouComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListerendezvouComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
