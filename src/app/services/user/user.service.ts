import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/observable';
import 'rxjs/add/operator/mergeMap';

import { AuthService } from '../auth/auth.service';
import { User } from '../../models/User';

@Injectable()
export class UserService {

  userCollection: AngularFirestoreCollection<User>;
  userDocument: AngularFirestoreDocument<User>;
  user: Observable<User>;
  authUser: any;

  constructor(
    private afs: AngularFirestore,
    private authService: AuthService,
  ) { }

  getCurrentUser(): Observable<User> {
    this.user = this.authService.getAuth()
    .flatMap(user => {
      this.userDocument = this.afs.doc<User>(`users/${user.uid}`);
      return this.userDocument.snapshotChanges().map(action => {
        if (action.payload.exists === false) {
          return null;
        } else {
          const data = action.payload.data() as User;
          data.id = action.payload.id;
          return data;
        }
      });
    });

    return this.user;
  }
}
