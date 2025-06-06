import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransmissionComponent } from './transmission.component';

describe('TransmissionComponent', () => {
  let component: TransmissionComponent;
  let fixture: ComponentFixture<TransmissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransmissionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransmissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
