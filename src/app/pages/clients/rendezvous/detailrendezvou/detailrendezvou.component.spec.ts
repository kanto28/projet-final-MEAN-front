import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailrendezvouComponent } from './detailrendezvou.component';

describe('DetailrendezvouComponent', () => {
  let component: DetailrendezvouComponent;
  let fixture: ComponentFixture<DetailrendezvouComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailrendezvouComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailrendezvouComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
