import { ExerciseService } from './exercise.service';
import { Exercise, emptyExerciseObject } from '../../models/Exercise';

import { OrderByDirection, CollectionReference } from '@firebase/firestore-types';
import { Observable } from 'rxjs/Observable';
import * as Rx from 'rxjs/Rx';

export class StubExerciseService extends ExerciseService {

  getExercises(
    sortField: string = 'name', 
    sortDirection: OrderByDirection = 'asc', 
    filters: Map<string, string> = null
  ): Observable<Exercise[]> {
    const exercises$ = Rx.Observable.create(observer => {
      const exercise = emptyExerciseObject();
      const exercises = [
        exercise
      ];
      observer.next(exercises);
    });
    return exercises$;
  }
}