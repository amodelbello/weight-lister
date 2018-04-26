import { AuthService } from './auth.service';
import * as Rx from 'rxjs/Rx';

export class StubAuthService extends AuthService {

  loggedIn: boolean = false;

  login(email: string, password: string) {
    return new Promise((resolve, reject) => {
      resolve();
    });
  }

  logout() {
    this.loggedIn = false;
  }

  isLoggedIn() {
    return this.loggedIn;
  }

  getAuth() {
    const auth$ = Rx.Observable.create(observer => {
      observer.next(
        {
          uid: 1,
          email: 'test@hello.com'
        }
      );
    });
    return auth$;
  }
}