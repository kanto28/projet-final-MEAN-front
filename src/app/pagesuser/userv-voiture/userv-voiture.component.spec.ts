import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UservVoitureComponent } from './userv-voiture.component';

describe('UservVoitureComponent', () => {
  let component: UservVoitureComponent;
  let fixture: ComponentFixture<UservVoitureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UservVoitureComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UservVoitureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
