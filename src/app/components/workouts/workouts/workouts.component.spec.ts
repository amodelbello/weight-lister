import { APP_BASE_HREF } from '@angular/common';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from '../../../app-routing.module';

import { LoadingDirective } from '../../../directives/loading.directive';
import { NumberToArrayPipe } from '../../../pipes/number-to-array.pipe';

import { WorkoutService } from '../../../services/workout/workout.service';
import { StubWorkoutService } from '../../../services/workout/workout.service.stub';
import { AuthService} from '../../../services/auth/auth.service';
import { StubAuthService } from '../../../services/auth/auth.service.stub';
import { UserService } from '../../../services/user/user.service';
import { StubUserService } from '../../../services/user/user.service.stub';
import { SortingService } from '../../../services/sorting/sorting.service';
import { PaginationService } from '../../../services/pagination/pagination.service';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { FlashMessagesService } from 'angular2-flash-messages';

import { PageItemLimitComponent } from '../../table/page-item-limit/page-item-limit.component';
import { ColumnHeaderComponent } from '../../table/column-header/column-header.component';
import { PaginationControlsComponent } from '../../table/pagination-controls/pagination-controls.component';
import { FilterFieldComponent } from '../../form/filter-field/filter-field.component';
import { DatetimePickerComponent } from '../../form/datetime-picker/datetime-picker.component';
import { SpinnerComponent } from '../../spinner/spinner.component';
import { LoginComponent } from '../../login/login.component';
import { AccountComponent } from '../../account/account.component';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { ExercisesComponent } from '../../exercises/exercises/exercises.component';
import { ExerciseFormComponent } from '../../exercises/exercise-form/exercise-form.component';
import { WorkoutExerciseComponent } from '../../workouts/workout-exercise/workout-exercise.component';
import { WorkoutExercisesComponent } from '../../workouts/workout-exercises/workout-exercises.component';
import { WorkoutComponent } from '../../workouts/workout/workout.component';
import { NotFoundComponent } from '../../not-found/not-found.component';
import { ExerciseSetComponent } from '../../workouts/exercise-set/exercise-set.component';
import { WorkoutsComponent } from './workouts.component';

import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';

describe('WorkoutsComponent', () => {
  let component: WorkoutsComponent;
  let fixture: ComponentFixture<WorkoutsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        LoadingDirective,
        NumberToArrayPipe,
        PageItemLimitComponent,
        ColumnHeaderComponent,
        FilterFieldComponent,
        PaginationControlsComponent,
        SpinnerComponent,
        NotFoundComponent,
        DatetimePickerComponent,
        LoginComponent,
        AccountComponent,
        DashboardComponent,
        ExercisesComponent,
        ExerciseFormComponent,
        WorkoutComponent,
        WorkoutExerciseComponent,
        WorkoutExercisesComponent,
        ExerciseSetComponent,
        WorkoutsComponent,
      ],
      providers: [
        { provide: APP_BASE_HREF, useValue : '/' },
        { provide: WorkoutService, useClass: StubWorkoutService },
        { provide: AuthService, useClass: StubAuthService },
        { provide: UserService, useClass: StubUserService },
        { provide: AngularFirestore, useClass: class {}},
        { provide: AngularFireAuth, useClass: class {}},
        FlashMessagesService,
        SortingService,
        PaginationService,
      ],
      imports: [
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
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
    fixture = TestBed.createComponent(WorkoutsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('changePage()', () => {
    it('should set current page to 1 if input is less than zero', () => {
      const setDataFromPaginationService = spyOn<any>(component, 'setDataFromPaginationService')
      const page = -5;

      component.changePage(page);
      expect(component.currentPage).toEqual(1);
      expect(setDataFromPaginationService).toHaveBeenCalled();
    });

    it('should set current page to number of pages if input is greater than number of pages', () => {
      const setDataFromPaginationService = spyOn<any>(component, 'setDataFromPaginationService')
      const page = 5;
      component.numberOfPages = 3

      component.changePage(page);
      expect(component.currentPage).toEqual(component.numberOfPages);
      expect(setDataFromPaginationService).toHaveBeenCalled();
    });

    it('should set current page to input specified', () => {
      const setDataFromPaginationService = spyOn<any>(component, 'setDataFromPaginationService')
      const page = 5;
      component.numberOfPages = 11

      component.changePage(page);
      expect(component.currentPage).toEqual(page);
      expect(setDataFromPaginationService).toHaveBeenCalled();
    });
  });

  describe('getPageLimit()', () => {
    it('should return page limit', () => {
      // TODO: This test might not be necessary
    });
  });

  describe('changeSort()', () => {
    it('should change sort field and direction and load workouts', () => {
      const field = 'sortFieldValue';
      spyOn(component, 'loadWorkouts');

      component.changeSort(field);

      expect(component.sortField).toBe(field);
      expect(component.sortDirection).toBe('asc');
      expect(component.loadWorkouts).toHaveBeenCalled();
    });

    it('should toggle sort direction to \'asc\'', () => {
      const field = 'sortFieldValue';
      component.sortField = field;
      spyOn(component, 'loadWorkouts');

      component.changeSort(field);

      expect(component.sortField).toBe(field);
      expect(component.sortDirection).toBe('asc');
      expect(component.loadWorkouts).toHaveBeenCalled();
    });

    it('should toggle sort direction to \'desc\'', () => {
      const field = 'sortFieldValue';
      component.sortField = field;
      component.sortDirection = 'asc';
      spyOn(component, 'loadWorkouts');

      component.changeSort(field);

      expect(component.sortField).toBe(field);
      expect(component.sortDirection).toBe('desc');
      expect(component.loadWorkouts).toHaveBeenCalled();
    });
  });
});
