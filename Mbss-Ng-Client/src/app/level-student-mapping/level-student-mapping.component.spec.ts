import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LevelStudentMappingComponent } from './level-student-mapping.component';

describe('LevelStudentMappingComponent', () => {
  let component: LevelStudentMappingComponent;
  let fixture: ComponentFixture<LevelStudentMappingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LevelStudentMappingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LevelStudentMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
