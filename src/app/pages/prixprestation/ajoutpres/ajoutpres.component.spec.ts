import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutpresComponent } from './ajoutpres.component';

describe('AjoutpresComponent', () => {
  let component: AjoutpresComponent;
  let fixture: ComponentFixture<AjoutpresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AjoutpresComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjoutpresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
