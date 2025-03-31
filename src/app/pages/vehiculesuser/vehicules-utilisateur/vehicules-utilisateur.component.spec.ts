import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehiculesUtilisateurComponent } from './vehicules-utilisateur.component';

describe('VehiculesUtilisateurComponent', () => {
  let component: VehiculesUtilisateurComponent;
  let fixture: ComponentFixture<VehiculesUtilisateurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VehiculesUtilisateurComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehiculesUtilisateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
