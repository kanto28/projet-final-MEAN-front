import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoriquestockComponent } from './historiquestock.component';

describe('HistoriquestockComponent', () => {
  let component: HistoriquestockComponent;
  let fixture: ComponentFixture<HistoriquestockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistoriquestockComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoriquestockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
