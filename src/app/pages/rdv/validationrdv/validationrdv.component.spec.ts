import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidationrdvComponent } from './validationrdv.component';

describe('ValidationrdvComponent', () => {
  let component: ValidationrdvComponent;
  let fixture: ComponentFixture<ValidationrdvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ValidationrdvComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValidationrdvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
