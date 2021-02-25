import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrSessStudentsInfoComponent } from './curr-sess-students-info.component';

describe('CurrSessStudentsInfoComponent', () => {
  let component: CurrSessStudentsInfoComponent;
  let fixture: ComponentFixture<CurrSessStudentsInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrSessStudentsInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrSessStudentsInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
