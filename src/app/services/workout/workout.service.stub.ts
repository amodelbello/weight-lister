import { WorkoutService } from './workout.service';
import { Workout, emptyWorkoutObject } from '../../models/Workout';

import { OrderByDirection, CollectionReference } from '@firebase/firestore-types';
import { Observable } from 'rxjs/Observable';
import * as Rx from 'rxjs/Rx';

declare var moment: any;

export class StubWorkoutService extends WorkoutService {

  getWorkouts(
    sortField: string = 'date', 
    sortDirection: OrderByDirection = 'desc', 
    filters: Map<string, string> = null
  ): Observable<Workout[]> {
      const workouts$ = Rx.Observable.create(observer => {
      const workout = emptyWorkoutObject();
      const workouts = [
        workout
      ];
      observer.next(workouts);
    });
    return workouts$;
  }

  getWorkout(id: string): Observable<Workout> {
    const workout = emptyWorkoutObject();
    workout.date = '2018-04-23T20:03:04.868Z';
    return Rx.Observable.of(workout);
  }

  createWorkout(formData) {
    return Rx.Observable.of('workoutIdValue');
  }

  updateWorkout(formData) {
    return Rx.Observable.of(formData);
  }
}