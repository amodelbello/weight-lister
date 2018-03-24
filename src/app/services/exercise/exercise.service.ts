import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/mergeMap';

import { Exercise } from '../../models/Exercise';
import { User } from '../../models/User';
import { UserService } from '../../services/user/user.service';
import { SortingService } from '../../services/sorting/sorting.service';
import { PaginationService } from '../../services/pagination/pagination.service';
import { OrderByDirection, CollectionReference } from '@firebase/firestore-types';

@Injectable()
export class ExerciseService {

  exercisesCollection: AngularFirestoreCollection<Exercise>;
  exerciseDoc: AngularFirestoreDocument<Exercise>;
  exercises$: Observable<Exercise[]>;
  exercise$: Observable<Exercise>;

  constructor(
    private afs: AngularFirestore,
    private userService: UserService,
    private sortingService: SortingService,
    private paginationService: PaginationService,
  ) { }

  getExercises(
    sortField: string = 'name', 
    sortDirection: OrderByDirection = 'asc', 
    filters: Map<string, string> = null,
    paginationArguments: Object = null,
  ): Observable<Exercise[]> {

    this.exercises$ = this.userService.getCurrentUser()
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
      })

      // Pagination
      /*
      allItems: this.allExercises,
      numberOfPages: this.numberOfPages,
      pageItemLimit: this.getPageLimit(),
      currentPage: this.currentPage,
      */
      .map(collection => {
        if (paginationArguments === null) {
          return collection;
        }
        const start = this.paginationService.getStart(paginationArguments);
        const end = this.paginationService.getEnd(paginationArguments);
        // console.log(paginationArguments);
        console.log(start);
        console.log(end);
        return collection.slice(start, end);
      });
    });

    return this.exercises$;
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
