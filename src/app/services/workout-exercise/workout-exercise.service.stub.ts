import { WorkoutExerciseService } from './workout-exercise.service';
import { WorkoutExercise, emptyWorkoutExerciseObject } from '../../models/WorkoutExercise';

import { OrderByDirection, CollectionReference } from '@firebase/firestore-types';
import { Observable } from 'rxjs/Observable';
import * as Rx from 'rxjs/Rx';

export class StubWorkoutExerciseService extends WorkoutExerciseService {

  getExercises(
    sortField: string = 'name', 
    sortDirection: OrderByDirection = 'asc', 
    filters: Map<string, string> = null
  ): Observable<WorkoutExercise[]> {
    const exercises$ = Rx.Observable.create(observer => {
      const exercise = emptyWorkoutExerciseObject();
      const exercises = [
        exercise
      ];
      observer.next(exercises);
    });
    return exercises$;
  }
}