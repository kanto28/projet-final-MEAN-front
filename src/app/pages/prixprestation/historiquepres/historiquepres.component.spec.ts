import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoriquepresComponent } from './historiquepres.component';

describe('HistoriquepresComponent', () => {
  let component: HistoriquepresComponent;
  let fixture: ComponentFixture<HistoriquepresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistoriquepresComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoriquepresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
