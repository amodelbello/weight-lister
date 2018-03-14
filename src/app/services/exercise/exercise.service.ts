import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

import { Exercise } from '../../models/Exercise';

@Injectable()
export class ExerciseService {

  exercisesCollection: AngularFirestoreCollection<Exercise>;
  exerciseDoc: AngularFirestoreCollection<Exercise>;
  exercises: Observable<Exercise[]>;
  exercise: Observable<Exercise>;

  constructor(
    private afs: AngularFirestore,
  ) { 
    this.exercisesCollection = this.afs.collection('exercises', ref => ref.orderBy('name', 'asc'));
  }

  getExercises(): Observable<Exercise[]> {
    this.exercises = this.exercisesCollection.snapshotChanges()
    .map(changes => {
      return changes.map(action => {
        const data = action.payload.doc.data() as Exercise;
        data.id = action.payload.doc.id;
        return data;
      });
    });

    return this.exercises;
  }

}
