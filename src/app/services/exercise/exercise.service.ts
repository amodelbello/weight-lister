import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/mergeMap';

import { Exercise } from '../../models/Exercise';
import { User } from '../../models/User';
import { UserService } from '../../services/user/user.service';

@Injectable()
export class ExerciseService {

  exercisesCollection: AngularFirestoreCollection<Exercise>;
  exerciseDoc: AngularFirestoreDocument<Exercise>;
  exercises: Observable<Exercise[]>;
  exercise: Observable<Exercise>;

  constructor(
    private afs: AngularFirestore,
    private userService: UserService,
  ) { }

  getExercises(): Observable<Exercise[]> {
    this.exercises = this.userService.getCurrentUser()
    .flatMap(user => {
      return this.afs.collection(`users/${user.id}/exercises`, ref => ref
        .orderBy('name', 'asc')
        .where('isActive', '==', true))
        .snapshotChanges()
        .map(changes => {
          return changes.map(action => {
            const data = action.payload.doc.data() as Exercise;
            data.id = action.payload.doc.id;
            return data;
          });
      });
    });

    return this.exercises;
  }
}
