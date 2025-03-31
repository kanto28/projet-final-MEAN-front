import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifvehiculeComponent } from './modifvehicule.component';

describe('ModifvehiculeComponent', () => {
  let component: ModifvehiculeComponent;
  let fixture: ComponentFixture<ModifvehiculeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifvehiculeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifvehiculeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
