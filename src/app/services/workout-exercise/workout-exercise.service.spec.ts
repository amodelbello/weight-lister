import { TestBed, inject } from '@angular/core/testing';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import { AuthService} from '../../services/auth/auth.service';
import { StubAuthService } from '../../services/auth/auth.service.stub';
import { UserService } from '../../services/user/user.service';
import { StubUserService } from '../../services/user/user.service.stub';
import { ExerciseService } from '../../services/exercise/exercise.service';
import { StubExerciseService } from '../../services/exercise/exercise.service.stub';
import { WorkoutExerciseService } from './workout-exercise.service';
import { SortingService } from '../../services/sorting/sorting.service';

describe('WorkoutExerciseService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        WorkoutExerciseService,
        { provide: UserService, useClass: StubUserService },
        { provide: AuthService, useClass: StubAuthService },
        { provide: AngularFireAuth, useClass: class {}},
        { provide: AngularFirestore, useClass: class {}},
        { provide: ExerciseService, useClass: StubExerciseService },
        SortingService,
      ],
    });
  });

  it('should be created', inject([WorkoutExerciseService], (service: WorkoutExerciseService) => {
    expect(service).toBeTruthy();
  }));
});
