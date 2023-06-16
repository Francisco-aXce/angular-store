import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NestedTreeComponent } from './nested-tree.component';

describe('NestedTreeComponent', () => {
  let component: NestedTreeComponent;
  let fixture: ComponentFixture<NestedTreeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NestedTreeComponent]
    });
    fixture = TestBed.createComponent(NestedTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
