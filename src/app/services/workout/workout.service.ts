import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { OrderByDirection, CollectionReference } from '@firebase/firestore-types';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/mergeMap';

import { Workout } from '../../models/Workout';
import { User } from '../../models/User';
import { UserService } from '../../services/user/user.service';
import { SortingService } from '../../services/sorting/sorting.service';

@Injectable()
export class WorkoutService {

  workouts: Observable<Workout[]>;
  workoutDoc: AngularFirestoreDocument<Workout>;
  workout: Observable<Workout>;

  constructor(
    private afs: AngularFirestore,
    private userService: UserService,
    private sortingService: SortingService,
  ) { }

  getWorkouts(
    sortField: string = 'date', 
    sortDirection: OrderByDirection = 'desc', 
    filters: Map<string, string> = null
  ): Observable<Workout[]> {

    this.workouts = this.userService.getCurrentUser()
    .flatMap(user => {
      return this.afs.collection(`users/${user.id}/workouts`, ref => {

        let query;
        query = ref.where('isActive', '==', true);

        return query;
      })
      .snapshotChanges()

      // Get the id of each row
      .map(changes => {
        return changes.map(action => {
          const data = action.payload.doc.data() as Workout;
          data.id = action.payload.doc.id;
          return data;
        });
      })

      // Sort the collection
      .map(collection => {
        return this.sortingService.sort(collection, sortField, sortDirection);
        });
    });

    return this.workouts;
  }

  getWorkout(id: string): Observable<Workout> {
    return this.userService.getCurrentUser()
    .flatMap(user => {
      this.workoutDoc = this.afs.doc<Workout>(`users/${user.id}/workouts/${id}`);
      return this.workout = this.workoutDoc.snapshotChanges().map(action => {
        if (action.payload.exists === false) {
          return null;
        } else {
          const data = action.payload.data() as Workout;
          data.id = action.payload.id;
          return data;
        }
      });
    });
  }

  createWorkout(formData) {
    return this.userService.getCurrentUser()
    .flatMap(user => {
      return Observable.fromPromise(this.afs.collection(`users/${user.id}/workouts`).add(formData))
      .map((doc) => {
        return doc.id;
      });
    });
  }

  updateWorkout(formData) {
    return this.userService.getCurrentUser()
    .map(user => {
      this.workoutDoc = this.afs.doc(`users/${user.id}/workouts/${formData.id}`);
      this.workoutDoc.update(formData);
    });
  }
}
