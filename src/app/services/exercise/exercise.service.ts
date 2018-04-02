import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { OrderByDirection, CollectionReference } from '@firebase/firestore-types';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/mergeMap';

import { Exercise } from '../../models/Exercise';
import { User } from '../../models/User';
import { UserService } from '../../services/user/user.service';
import { SortingService } from '../../services/sorting/sorting.service';

@Injectable()
export class ExerciseService {

  // TODO: Remove this line?
  exercisesCollection: AngularFirestoreCollection<Exercise>;

  exerciseDoc: AngularFirestoreDocument<Exercise>;
  exercises: Observable<Exercise[]>;
  exercise: Observable<Exercise>;

  constructor(
    private afs: AngularFirestore,
    private userService: UserService,
    private sortingService: SortingService,
  ) { }

  getExercises(
    sortField: string = 'name', 
    sortDirection: OrderByDirection = 'asc', 
    filters: Map<string, string> = null
  ): Observable<Exercise[]> {

    this.exercises = this.userService.getCurrentUser()
    .flatMap(user => {
      return this.afs.collection(`users/${user.id}/exercises`, ref => { 

        let query;
        query = ref.where('isActive', '==', true);

        if (filters != null) {
          filters.forEach(function(value, key) {
            query = query.where(key, '==', value);
          });
        } 

        return query;
      })
      .snapshotChanges()

      // Get the id of each row
      .map(changes => {
        return changes.map(action => {
          const data = action.payload.doc.data() as Exercise;
          data.id = action.payload.doc.id;
          return data;
        });
      })

      // Sort the collection
      .map(collection => {
        return this.sortingService.sort(collection, sortField, sortDirection);
       });
    });

    return this.exercises;
  }

  getExercise(id: string): Observable<Exercise> {
    return this.userService.getCurrentUser()
    .flatMap(user => {
      this.exerciseDoc = this.afs.doc<Exercise>(`users/${user.id}/exercises/${id}`);
      return this.exercise = this.exerciseDoc.snapshotChanges().map(action => {
        if (action.payload.exists === false) {
          return null;
        } else {
          const data = action.payload.data() as Exercise;
          data.id = action.payload.id;
          return data;
        }
      });
    });
  }

  createExercise(formData) {
    return this.userService.getCurrentUser()
    .map(user => {
      this.afs.collection(`users/${user.id}/exercises`).add(formData);
    });
  }

  updateExercise(formData) {
    return this.userService.getCurrentUser()
    .map(user => {
      this.exerciseDoc = this.afs.doc(`users/${user.id}/exercises/${formData.id}`);
      this.exerciseDoc.update(formData);
    });
  }

}
