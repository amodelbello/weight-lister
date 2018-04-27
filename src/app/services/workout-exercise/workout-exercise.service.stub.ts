import { WorkoutExerciseService } from './workout-exercise.service';
import { WorkoutExercise, emptyWorkoutExerciseObject } from '../../models/WorkoutExercise';

import { OrderByDirection, CollectionReference } from '@firebase/firestore-types';
import { Observable } from 'rxjs/Observable';
import * as Rx from 'rxjs/Rx';

export class StubWorkoutExerciseService extends WorkoutExerciseService {

  getWorkoutExercises(
    workoutId: string = '',
    sortField: string = '', 
    sortDirection: OrderByDirection = 'desc', 
    filters: Map<string, string> = null
  ): Observable<WorkoutExercise[]> {
    const workoutExercises$ = Rx.Observable.create(observer => {
      const workoutExercise = emptyWorkoutExerciseObject();
      const workoutExercises = [
        workoutExercise
      ];
      observer.next(workoutExercises);
    });
    return workoutExercises$;
  }

  getLatestWorkoutExercises(): Observable<WorkoutExercise[]> {
    const workoutExercises$ = Rx.Observable.create(observer => {
      const workoutExercise = emptyWorkoutExerciseObject();
      const workoutExercises = [
        workoutExercise
      ];
      observer.next(workoutExercises);
    });
    return workoutExercises$;
  }
}