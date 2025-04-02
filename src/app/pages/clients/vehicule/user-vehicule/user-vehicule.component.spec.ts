import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserVehiculeComponent } from './user-vehicule.component';

describe('UserVehiculeComponent', () => {
  let component: UserVehiculeComponent;
  let fixture: ComponentFixture<UserVehiculeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserVehiculeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserVehiculeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
