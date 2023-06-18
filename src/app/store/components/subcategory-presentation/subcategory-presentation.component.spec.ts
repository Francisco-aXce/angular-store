import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubcategoryPresentationComponent } from './subcategory-presentation.component';

describe('SubcategoryPresentationComponent', () => {
  let component: SubcategoryPresentationComponent;
  let fixture: ComponentFixture<SubcategoryPresentationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SubcategoryPresentationComponent]
    });
    fixture = TestBed.createComponent(SubcategoryPresentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
