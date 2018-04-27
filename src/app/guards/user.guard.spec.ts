import { TestBed, async, inject } from '@angular/core/testing';

import { Router } from '@angular/router';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthService} from '../services/auth/auth.service';
import { StubAuthService } from '../services/auth/auth.service.stub';
import { UserService } from '../services/user/user.service';
import { StubUserService } from '../services/user/user.service.stub';

import { UserGuard } from './user.guard';

describe('UserGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UserGuard,
        { provide: Router, useClass: class { navigate = jasmine.createSpy('navigate'); } },
        { provide: UserService, useClass: StubUserService },
        { provide: AuthService, useClass: StubAuthService },
        { provide: AngularFirestore, useClass: class {}},
        { provide: AngularFireAuth, useClass: class {}},
      ]
    });
  });

  it('should ...', inject([UserGuard], (guard: UserGuard) => {
    expect(guard).toBeTruthy();
  }));
});
