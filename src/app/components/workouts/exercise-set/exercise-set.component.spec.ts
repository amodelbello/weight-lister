import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExerciseSetComponent } from './exercise-set.component';

describe('ExerciseSetComponent', () => {
  let component: ExerciseSetComponent;
  let fixture: ComponentFixture<ExerciseSetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExerciseSetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExerciseSetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
