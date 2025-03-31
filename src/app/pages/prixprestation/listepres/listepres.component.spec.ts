import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListepresComponent } from './listepres.component';

describe('ListepresComponent', () => {
  let component: ListepresComponent;
  let fixture: ComponentFixture<ListepresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListepresComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListepresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
