import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListemecdispoComponent } from './listemecdispo.component';

describe('ListemecdispoComponent', () => {
  let component: ListemecdispoComponent;
  let fixture: ComponentFixture<ListemecdispoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListemecdispoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListemecdispoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
