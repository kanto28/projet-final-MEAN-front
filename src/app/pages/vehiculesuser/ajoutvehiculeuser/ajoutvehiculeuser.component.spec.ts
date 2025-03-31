import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutvehiculeuserComponent } from './ajoutvehiculeuser.component';

describe('AjoutvehiculeuserComponent', () => {
  let component: AjoutvehiculeuserComponent;
  let fixture: ComponentFixture<AjoutvehiculeuserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AjoutvehiculeuserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjoutvehiculeuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
