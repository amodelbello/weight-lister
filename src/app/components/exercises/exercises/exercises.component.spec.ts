import { APP_BASE_HREF } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingDirective } from '../../../directives/loading.directive';
import { NumberToArrayPipe } from '../../../pipes/number-to-array.pipe';

import { PageItemLimitComponent } from '../../table/page-item-limit/page-item-limit.component';
import { ColumnHeaderComponent } from '../../table/column-header/column-header.component';
import { PaginationControlsComponent } from '../../table/pagination-controls/pagination-controls.component';
import { FilterFieldComponent } from '../../form/filter-field/filter-field.component';
import { LoginComponent } from '../../login/login.component';
import { AccountComponent } from '../../account/account.component';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { WorkoutsComponent } from '../../workouts/workouts/workouts.component';
import { WorkoutComponent } from '../../workouts/workout/workout.component';
import { NotFoundComponent } from '../../not-found/not-found.component';
import { ExerciseFormComponent } from '../../exercises/exercise-form/exercise-form.component';
import { DatetimePickerComponent } from '../../form/datetime-picker/datetime-picker.component';
import { WorkoutExerciseComponent } from '../../workouts/workout-exercise/workout-exercise.component';
import { WorkoutExercisesComponent } from '../../workouts/workout-exercises/workout-exercises.component';
import { ExerciseSetComponent } from '../../workouts/exercise-set/exercise-set.component';
import { SpinnerComponent } from '../../spinner/spinner.component';
import { ExercisesComponent } from './exercises.component';

import { ExerciseService } from '../../../services/exercise/exercise.service';
import { StubExerciseService } from '../../../services/exercise/exercise.service.stub';
import { AuthService} from '../../../services/auth/auth.service';
import { StubAuthService } from '../../../services/auth/auth.service.stub';
import { UserService } from '../../../services/user/user.service';
import { StubUserService } from '../../../services/user/user.service.stub';
import { SortingService } from '../../../services/sorting/sorting.service';
import { PaginationService } from '../../../services/pagination/pagination.service';
import { LocalStorageService } from '../../../services/local-storage/local-storage.service';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { FlashMessagesService } from 'angular2-flash-messages';

import { AppRoutingModule } from '../../../app-routing.module';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';

describe('ExercisesComponent', () => {
  let component: ExercisesComponent;
  let fixture: ComponentFixture<ExercisesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        LoadingDirective,
        ExercisesComponent,
        PageItemLimitComponent,
        ColumnHeaderComponent,
        FilterFieldComponent,
        PaginationControlsComponent,
        LoginComponent,
        AccountComponent,
        DashboardComponent,
        WorkoutsComponent,
        WorkoutComponent,
        NotFoundComponent,
        ExerciseFormComponent,
        DatetimePickerComponent,
        WorkoutExerciseComponent,
        WorkoutExercisesComponent,
        ExerciseSetComponent,
        SpinnerComponent,
        NumberToArrayPipe,
      ],
      imports: [
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
      ],
      providers: [
        { provide: APP_BASE_HREF, useValue : '/' },
        { provide: ExerciseService, useClass: StubExerciseService },
        { provide: AuthService, useClass: StubAuthService },
        { provide: UserService, useClass: StubUserService },
        { provide: AngularFirestore, useClass: class {}},
        { provide: AngularFireAuth, useClass: class {}},
        FlashMessagesService,
        SortingService,
        PaginationService,
        LocalStorageService,
      ],
    })
    .overrideModule(BrowserDynamicTestingModule, {
      set: {
        entryComponents: [
          SpinnerComponent,
        ]
      }
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExercisesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
