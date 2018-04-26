import { UserService } from './user.service';
import { User, emptyUserObject } from '../../models/User';

import * as Rx from 'rxjs/Rx';

export class StubUserService extends UserService {

  getCurrentUser() {
    return Rx.Observable.of(emptyUserObject());
  }
}