import { AuthService } from './auth.service';

export class StubAuthService extends AuthService {

  loggedIn: boolean = false;

  constructor() {
    super();
  }

  login() {
    this.loggedIn = true;
  }

  logout() {
    this.loggedIn = false;
  }

  isLoggedIn() {
    return this.loggedIn;
  }
}