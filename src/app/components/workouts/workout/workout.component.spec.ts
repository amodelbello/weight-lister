import * as Rx from 'rxjs/Rx';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute, UrlSegment } from '@angular/router';

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
import { LocalStorageService } from '../../../services/local-storage/local-storage.service';
import { FormInteractionService } from '../../../services/interaction/form.service';

import { DatetimePickerComponent } from '../..//form/datetime-picker/datetime-picker.component';
import { PageItemLimitComponent } from '../../table/page-item-limit/page-item-limit.component';
import { ColumnHeaderComponent } from '../../table/column-header/column-header.component';
import { PaginationControlsComponent } from '../../table/pagination-controls/pagination-controls.component';
import { FilterFieldComponent } from '../../form/filter-field/filter-field.component';
import { WorkoutExerciseComponent } from '../../workouts/workout-exercise/workout-exercise.component';
import { WorkoutExercisesComponent } from '../../workouts/workout-exercises/workout-exercises.component';
import { ExerciseSetComponent } from '../../workouts/exercise-set/exercise-set.component';
import { WorkoutComponent } from './workout.component';
import { SpinnerComponent } from '../../spinner/spinner.component';
import { FormType } from '../../../models/FormType';
import { emptyWorkoutObject } from '../../../models/Workout';
import { emptyWorkoutExerciseObject } from '../../../models/WorkoutExercise';

describe('WorkoutComponent', () => {
  let component: WorkoutComponent;
  let fixture: ComponentFixture<WorkoutComponent>;
  let workoutService: WorkoutService;
  let workoutExerciseService: WorkoutExerciseService;
  let flashMessage: FlashMessagesService;
  let route: ActivatedRoute;
  let lss: LocalStorageService;

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
        SpinnerComponent,
      ],
      imports: [
        FormsModule,
      ],
      providers: [
        { provide: Router, useClass: class { navigate = jasmine.createSpy('navigate'); } },
        { provide: ActivatedRoute, useValue: { 
            snapshot: 
              { params: { id: 'workoutId' },
              url: [
                { path: 'workouts' },
                { path: 'edit' },
              ],
            },
          },
        },
        { provide: WorkoutService, useClass: StubWorkoutService },
        { provide: ExerciseService, useClass: StubExerciseService },
        { provide: WorkoutExerciseService, useClass: StubWorkoutExerciseService },
        { provide: AuthService, useClass: StubAuthService },
        { provide: UserService, useClass: StubUserService },
        { provide: AngularFirestore, useClass: class {}},
        { provide: AngularFireAuth, useClass: class {}},
        { provide: FlashMessagesService, useClass: class { show = jasmine.createSpy('show'); }},
        SortingService,
        PaginationService,
        LocalStorageService,
        FormInteractionService,
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
    fixture = TestBed.createComponent(WorkoutComponent);
    component = fixture.componentInstance;
    workoutExerciseService = TestBed.get(WorkoutExerciseService);
    workoutService = TestBed.get(WorkoutService);
    flashMessage = TestBed.get(FlashMessagesService);
    route = TestBed.get(ActivatedRoute);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit()', () => {
    it('should init when forn type is \'edit\'', fakeAsync(() => {

      spyOn(workoutService, 'getWorkout').and.callThrough();

      const workoutExercise = emptyWorkoutExerciseObject();
      spyOn(workoutExerciseService, 'getWorkoutExercises').and.returnValue(Rx.Observable.of([workoutExercise]));

      component.ngOnInit();
      tick();

      expect(workoutService.getWorkout).toHaveBeenCalledWith(component.id);
      expect(workoutExerciseService.getWorkoutExercises).toHaveBeenCalledWith(component.id);
      expect(component.id).toEqual(route.snapshot.params['id']);
      expect(component.exercisesLoading).toBeFalsy();
      expect(component.workout.date).toMatch(/[\w]+, [\d]{2}\/[\d]{2}\/[\d]{4}, [\d]{1,2}:[\d]{2} [\w]{2}/)
    }));

    it('should init when forn type is \'add\'', fakeAsync(() => {
      route.snapshot.url[1].path = 'add';

      spyOn(workoutService, 'getWorkout');
      spyOn(workoutExerciseService, 'getWorkoutExercises');

      component.ngOnInit();
      tick();

      expect(workoutService.getWorkout).not.toHaveBeenCalled();
      expect(workoutExerciseService.getWorkoutExercises).not.toHaveBeenCalled();
      expect(component.id).toEqual(route.snapshot.params['id']);
      expect(component.exercisesLoading).toBeFalsy();
    }));

    it('should init when forn type is not an expected value', fakeAsync(() => {
      route.snapshot.url[1].path = 'null';

      spyOn(workoutService, 'getWorkout');
      spyOn(workoutExerciseService, 'getWorkoutExercises');

      component.ngOnInit();
      tick();

      expect(workoutService.getWorkout).not.toHaveBeenCalled();
      expect(workoutExerciseService.getWorkoutExercises).not.toHaveBeenCalled();
      expect(component.id).toEqual(route.snapshot.params['id']);
      expect(component.exercisesLoading).toBeFalsy();
    }));

    it('should init when url is different than expected', fakeAsync(() => {
      route.snapshot.url[0].path = 'null';

      spyOn(workoutService, 'getWorkout');
      spyOn(workoutExerciseService, 'getWorkoutExercises');

      component.ngOnInit();
      tick();

      expect(workoutService.getWorkout).not.toHaveBeenCalled();
      expect(workoutExerciseService.getWorkoutExercises).not.toHaveBeenCalled();
      expect(component.id).toEqual(route.snapshot.params['id']);
      expect(component.exercisesLoading).toBeFalsy();
    }));
  });
});
