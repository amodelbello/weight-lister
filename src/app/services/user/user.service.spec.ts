import { TestBed, inject } from '@angular/core/testing';

import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthService} from '../../services/auth/auth.service';
import { StubAuthService } from '../../services/auth/auth.service.stub';
import { UserService } from './user.service';

describe('UserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UserService,
        { provide: AngularFirestore, useClass: class {}},
        { provide: AngularFireAuth, useClass: class {}},
        { provide: AuthService, useClass: StubAuthService },
      ],
    });
  });

  it('should be created', inject([UserService], (service: UserService) => {
    expect(service).toBeTruthy();
  }));
});
