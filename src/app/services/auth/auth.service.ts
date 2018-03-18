import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/observable';

@Injectable()
export class AuthService {

  // TODO: I think I can lose this property... need to test though
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

  // TODO: I think I can lose this method... need to test though
  isLoggedIn() {
    return this.loggedIn;
  }

  // TODO: Make this work
  updateAuthUser(formData) {
    console.log(formData);
    let test = this.afAuth.auth.currentUser.updateEmail(formData.email);
    return test;
  }

}
