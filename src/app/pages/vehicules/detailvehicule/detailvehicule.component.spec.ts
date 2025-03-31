import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailvehiculeComponent } from './detailvehicule.component';

describe('DetailvehiculeComponent', () => {
  let component: DetailvehiculeComponent;
  let fixture: ComponentFixture<DetailvehiculeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailvehiculeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailvehiculeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
