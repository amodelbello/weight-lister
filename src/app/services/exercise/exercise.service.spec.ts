import { TestBed, inject } from '@angular/core/testing';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import { AuthService} from '../../services/auth/auth.service';
import { StubAuthService } from '../../services/auth/auth.service.stub';
import { UserService } from '../../services/user/user.service';
import { StubUserService } from '../../services/user/user.service.stub';
import { SortingService } from '../../services/sorting/sorting.service';

import { ExerciseService } from './exercise.service';

describe('ExerciseService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ExerciseService,
        { provide: UserService, useClass: StubUserService },
        { provide: AuthService, useClass: StubAuthService },
        { provide: AngularFireAuth, useClass: class {}},
        { provide: AngularFirestore, useClass: class {}},
        SortingService,
      ],
    });
  });

  it('should be created', inject([ExerciseService], (service: ExerciseService) => {
    expect(service).toBeTruthy();
  }));
});
