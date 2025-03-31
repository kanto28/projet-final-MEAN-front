import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailvehiculeuserComponent } from './detailvehiculeuser.component';

describe('DetailvehiculeuserComponent', () => {
  let component: DetailvehiculeuserComponent;
  let fixture: ComponentFixture<DetailvehiculeuserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailvehiculeuserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailvehiculeuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
