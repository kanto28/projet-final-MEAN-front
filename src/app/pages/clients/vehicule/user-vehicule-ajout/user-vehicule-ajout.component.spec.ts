import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserVehiculeAjoutComponent } from './user-vehicule-ajout.component';

describe('UserVehiculeAjoutComponent', () => {
  let component: UserVehiculeAjoutComponent;
  let fixture: ComponentFixture<UserVehiculeAjoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserVehiculeAjoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserVehiculeAjoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
