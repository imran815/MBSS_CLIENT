import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendanceCountsComponent } from './attendance-counts.component';

describe('AttendanceCountsComponent', () => {
  let component: AttendanceCountsComponent;
  let fixture: ComponentFixture<AttendanceCountsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttendanceCountsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendanceCountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
