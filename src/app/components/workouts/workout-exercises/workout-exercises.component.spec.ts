import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingDirective } from '../../../directives/loading.directive';
import { NumberToArrayPipe } from '../../../pipes/number-to-array.pipe';

import { ExerciseService } from '../../../services/exercise/exercise.service';
import { StubExerciseService } from '../../../services/exercise/exercise.service.stub';
import { WorkoutExerciseService } from '../../../services/workout-exercise/workout-exercise.service';
import { StubWorkoutExerciseService } from '../../../services/workout-exercise/workout-exercise.service.stub';
import { AuthService} from '../../../services/auth/auth.service';
import { StubAuthService } from '../../../services/auth/auth.service.stub';
import { UserService } from '../../../services/user/user.service';
import { StubUserService } from '../../../services/user/user.service.stub';
import { SortingService } from '../../../services/sorting/sorting.service';
import { PaginationService } from '../../../services/pagination/pagination.service';
import { LocalStorageService } from '../../../services/local-storage/local-storage.service';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';

import { PageItemLimitComponent } from '../../table/page-item-limit/page-item-limit.component';
import { ColumnHeaderComponent } from '../../table/column-header/column-header.component';
import { PaginationControlsComponent } from '../../table/pagination-controls/pagination-controls.component';
import { FilterFieldComponent } from '../../form/filter-field/filter-field.component';
import { SpinnerComponent } from '../../spinner/spinner.component';
import { WorkoutExercisesComponent } from './workout-exercises.component';

import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';

describe('WorkoutExercisesComponent', () => {
  let component: WorkoutExercisesComponent;
  let fixture: ComponentFixture<WorkoutExercisesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        LoadingDirective,
        NumberToArrayPipe,
        SpinnerComponent,
        PageItemLimitComponent,
        ColumnHeaderComponent,
        FilterFieldComponent,
        PaginationControlsComponent,
        WorkoutExercisesComponent,
      ],
      providers: [
        { provide: ExerciseService, useClass: StubExerciseService },
        { provide: WorkoutExerciseService, useClass: StubWorkoutExerciseService },
        { provide: AngularFirestore, useClass: class {}},
        { provide: AngularFireAuth, useClass: class {}},
        { provide: AuthService, useClass: StubAuthService },
        { provide: UserService, useClass: StubUserService },
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
    fixture = TestBed.createComponent(WorkoutExercisesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
