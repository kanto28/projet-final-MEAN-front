import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrixrdvComponent } from './prixrdv.component';

describe('PrixrdvComponent', () => {
  let component: PrixrdvComponent;
  let fixture: ComponentFixture<PrixrdvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrixrdvComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrixrdvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
