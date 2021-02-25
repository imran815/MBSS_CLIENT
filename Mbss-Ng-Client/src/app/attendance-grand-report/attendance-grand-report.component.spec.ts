import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendanceGrandReportComponent } from './attendance-grand-report.component';

describe('AttendanceGrandReportComponent', () => {
  let component: AttendanceGrandReportComponent;
  let fixture: ComponentFixture<AttendanceGrandReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttendanceGrandReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendanceGrandReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
