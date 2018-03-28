import { TestBed, inject } from '@angular/core/testing';

import { WorkoutExerciseService } from './workout-exercise.service';

describe('WorkoutExerciseService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WorkoutExerciseService]
    });
  });

  it('should be created', inject([WorkoutExerciseService], (service: WorkoutExerciseService) => {
    expect(service).toBeTruthy();
  }));
});
