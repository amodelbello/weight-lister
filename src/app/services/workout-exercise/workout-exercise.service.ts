import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { OrderByDirection, CollectionReference } from '@firebase/firestore-types';
import { Observable } from 'rxjs/Observable';

import { WorkoutExercise } from '../../models/WorkoutExercise';
import { ExerciseService } from '../../services/exercise/exercise.service';
import { Exercise, emptyExerciseObject } from '../../models/Exercise';
import { User } from '../../models/User';
import { UserService } from '../../services/user/user.service';
import { SortingService } from '../../services/sorting/sorting.service';

@Injectable()
export class WorkoutExerciseService {

  workoutExercises: Observable<WorkoutExercise[]>;
  workoutExerciseDoc: AngularFirestoreDocument<WorkoutExercise>;
  workoutExercise: Observable<WorkoutExercise>;

  constructor(
    private afs: AngularFirestore,
    private userService: UserService,
    private exerciseService: ExerciseService,
    private sortingService: SortingService,
  ) { }

  getWorkoutExercises(
    workoutId: string,
    sortField: string = '', 
    sortDirection: OrderByDirection = 'desc', 
    filters: Map<string, string> = null
  ): Observable<WorkoutExercise[]> {

    this.workoutExercises = this.userService.getCurrentUser()
    .mergeMap((user) => {
      return this.afs.collection(`users/${user.id}/workout-exercises`, ref => {
        let query;
        query = ref.where('workoutId', '==', workoutId);
        return query;
      })
      .snapshotChanges()

      .map(changes => {
        return changes.map(action => {

          // get id of each row
          const data = action.payload.doc.data() as WorkoutExercise;
          data.id = action.payload.doc.id;

          // get exercise object of each row
          const exerciseDoc = this.afs.doc<Exercise>(`users/${user.id}/exercises/${data.exerciseId}`).snapshotChanges()
          .map((exercise) => {
            const exerciseId = exercise.payload.id;
            data.exercise = exercise.payload.data() as Exercise;
            data.exercise.id = exerciseId;
            return exercise;
          })
          .subscribe();

          return data;
        });
      })
    });

    return this.workoutExercises;
  }

  createWorkoutExercise(formData) {
    return this.userService.getCurrentUser()
    .flatMap(user => {
      return Observable.fromPromise(this.afs.collection(`users/${user.id}/workout-exercises`).add(formData))
      .map((doc) => {
        return doc.id;
      });
    });
  }

  updateWorkoutExercise(formData) {
    let data = this.toFireStoreDoc(formData);
    return this.userService.getCurrentUser()
    .map(user => {
      this.workoutExerciseDoc = this.afs.doc(`users/${user.id}/workout-exercises/${data.id}`);
      this.workoutExerciseDoc.update(data);
    });
  }

  deleteWorkoutExercise(workoutExercise: WorkoutExercise) {
    return this.userService.getCurrentUser()
    .map(user => {
      this.workoutExerciseDoc = this.afs.doc(`users/${user.id}/workout-exercises/${workoutExercise.id}`);
      this.workoutExerciseDoc.delete();
    });
  }

  private toFireStoreDoc(formData) {
    let doc: any = {};
    doc.id = formData.id;
    doc.exerciseId = formData.exerciseId;
    doc.workoutId = formData.workoutId;
    doc.sets = formData.sets;

    return doc;
  }
}
