import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListepresationComponent } from './listepresation.component';

describe('ListepresationComponent', () => {
  let component: ListepresationComponent;
  let fixture: ComponentFixture<ListepresationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListepresationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListepresationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
