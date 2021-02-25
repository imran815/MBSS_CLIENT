import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherLevelMappingComponent } from './teacher-level-mapping.component';

describe('TeacherLevelMappingComponent', () => {
  let component: TeacherLevelMappingComponent;
  let fixture: ComponentFixture<TeacherLevelMappingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherLevelMappingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherLevelMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
