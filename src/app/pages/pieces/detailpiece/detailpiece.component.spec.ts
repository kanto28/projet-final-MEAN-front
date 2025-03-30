import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailpieceComponent } from './detailpiece.component';

describe('DetailpieceComponent', () => {
  let component: DetailpieceComponent;
  let fixture: ComponentFixture<DetailpieceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailpieceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailpieceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
