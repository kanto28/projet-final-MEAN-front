import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailprestationComponent } from './detailprestation.component';

describe('DetailprestationComponent', () => {
  let component: DetailprestationComponent;
  let fixture: ComponentFixture<DetailprestationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailprestationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailprestationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
