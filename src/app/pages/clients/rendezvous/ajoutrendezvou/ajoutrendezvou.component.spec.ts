import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutrendezvouComponent } from './ajoutrendezvou.component';

describe('AjoutrendezvouComponent', () => {
  let component: AjoutrendezvouComponent;
  let fixture: ComponentFixture<AjoutrendezvouComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AjoutrendezvouComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjoutrendezvouComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
