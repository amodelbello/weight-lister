import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/observable';

@Injectable()
export class AuthService {

  loggedIn: boolean = false;

  constructor(
    private afAuth: AngularFireAuth,
  ) {}

  login(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((userData) => {
        resolve();
      })
      .catch(e => {
        reject(e);
      });
    });
  }

  getAuth() {
    return this.afAuth.authState.map(auth => auth);
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  isLoggedIn() {
    return this.loggedIn;
  }

}
