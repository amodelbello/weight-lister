import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { LoadingDirective } from '../../../directives/loading.directive';
import { NumberToArrayPipe } from '../../../pipes/number-to-array.pipe';

import { AuthService} from '../../../services/auth/auth.service';
import { StubAuthService } from '../../../services/auth/auth.service.stub';
import { UserService } from '../../../services/user/user.service';
import { StubUserService } from '../../../services/user/user.service.stub';
import { WorkoutService } from '../../../services/workout/workout.service';
import { StubWorkoutService } from '../../../services/workout/workout.service.stub';
import { ExerciseService } from '../../../services/exercise/exercise.service';
import { StubExerciseService } from '../../../services/exercise/exercise.service.stub';
import { WorkoutExerciseService } from '../../../services/workout-exercise/workout-exercise.service';
import { StubWorkoutExerciseService } from '../../../services/workout-exercise/workout-exercise.service.stub';
import { SortingService } from '../../../services/sorting/sorting.service';
import { PaginationService } from '../../../services/pagination/pagination.service';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { FlashMessagesService } from 'angular2-flash-messages';

import { DatetimePickerComponent } from '../..//form/datetime-picker/datetime-picker.component';
import { PageItemLimitComponent } from '../../table/page-item-limit/page-item-limit.component';
import { ColumnHeaderComponent } from '../../table/column-header/column-header.component';
import { PaginationControlsComponent } from '../../table/pagination-controls/pagination-controls.component';
import { FilterFieldComponent } from '../../form/filter-field/filter-field.component';
import { WorkoutExerciseComponent } from '../../workouts/workout-exercise/workout-exercise.component';
import { WorkoutExercisesComponent } from '../../workouts/workout-exercises/workout-exercises.component';
import { ExerciseSetComponent } from '../../workouts/exercise-set/exercise-set.component';
import { WorkoutComponent } from './workout.component';

describe('WorkoutComponent', () => {
  let component: WorkoutComponent;
  let fixture: ComponentFixture<WorkoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        LoadingDirective,
        NumberToArrayPipe,
        PageItemLimitComponent,
        ColumnHeaderComponent,
        FilterFieldComponent,
        PaginationControlsComponent,
        DatetimePickerComponent,
        WorkoutExerciseComponent,
        WorkoutExercisesComponent,
        ExerciseSetComponent,
        WorkoutComponent,
      ],
      imports: [
        FormsModule,
      ],
      providers: [
        { provide: Router, useClass: class { navigate = jasmine.createSpy('navigate'); } },
        { provide: ActivatedRoute, useClass: class { }},
        { provide: WorkoutService, useClass: StubWorkoutService },
        { provide: ExerciseService, useClass: StubExerciseService },
        { provide: WorkoutExerciseService, useClass: StubWorkoutExerciseService },
        { provide: AuthService, useClass: StubAuthService },
        { provide: UserService, useClass: StubUserService },
        { provide: AngularFirestore, useClass: class {}},
        { provide: AngularFireAuth, useClass: class {}},
        FlashMessagesService,
        SortingService,
        PaginationService,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
