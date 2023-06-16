import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidenavContentComponent } from './sidenav-content.component';

describe('SidenavContentComponent', () => {
  let component: SidenavContentComponent;
  let fixture: ComponentFixture<SidenavContentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SidenavContentComponent]
    });
    fixture = TestBed.createComponent(SidenavContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
