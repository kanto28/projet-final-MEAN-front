import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifvehiculeuserComponent } from './modifvehiculeuser.component';

describe('ModifvehiculeuserComponent', () => {
  let component: ModifvehiculeuserComponent;
  let fixture: ComponentFixture<ModifvehiculeuserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifvehiculeuserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifvehiculeuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
