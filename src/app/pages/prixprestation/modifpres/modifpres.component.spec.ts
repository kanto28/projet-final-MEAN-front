import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifpresComponent } from './modifpres.component';

describe('ModifpresComponent', () => {
  let component: ModifpresComponent;
  let fixture: ComponentFixture<ModifpresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifpresComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifpresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
