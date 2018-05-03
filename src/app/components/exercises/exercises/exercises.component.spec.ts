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
import { FormType } from '../../../models/FormType';
import { emptyExerciseObject } from '../../../models/Exercise';

describe('ExercisesComponent', () => {
  let component: ExercisesComponent;
  let fixture: ComponentFixture<ExercisesComponent>;
  let lss: LocalStorageService;

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
    lss = TestBed.get(LocalStorageService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('changePage()', () => {
    it('should change current page to given input', () => {

      component.numberOfPages = 10; 
      component.changePage(2);
      expect(component.currentPage).toBe(2);
    });

    it('should change current page to 1 when input is less than 1', () => {
      component.numberOfPages = 10; 
      component.changePage(-4);
      expect(component.currentPage).toBe(1);
    });

    it('should change current page to equal number of pages when given input is greater than number of pages', () => {
      const numberOfPages = 10;
      component.numberOfPages = numberOfPages;
      component.changePage(44);
      expect(component.currentPage).toBe(numberOfPages);
    });
  });

  describe('toggleSearchFilters()', () => {
    it('should toggle search filters to false', () => {
      spyOn(lss, 'get').and.returnValue('true');
      spyOn(lss, 'set');

      component.toggleSearchFilters();

      expect(component.showSearchFilters).toBeFalsy();
      expect(lss.set).toHaveBeenCalledWith(lss.exerciseTable.showFilters, 'false');
    });

    it('should toggle search filters to true', () => {
      spyOn(lss, 'get').and.returnValue('false');
      spyOn(lss, 'set');

      component.toggleSearchFilters();

      expect(component.showSearchFilters).toBeTruthy();
      expect(lss.set).toHaveBeenCalledWith(lss.exerciseTable.showFilters, 'true');
    });
  });

  describe('getSearchFilterValues()', () => {
    it('should set exercise type filter values', () => {
      const exerciseTypeValue = 'exerciseTypeValue';
      spyOn(lss, 'get').and.returnValue(exerciseTypeValue);
      const searchFilterValue = component.getSearchFilterValues();
      expect(searchFilterValue.get('type')).toBe(exerciseTypeValue);
    });

    it('should set muscle group filter values', () => {
      const muscleGroupValue = 'muscleGroupValue';
      spyOn(lss, 'get').and.returnValue(muscleGroupValue);
      const searchFilterValue = component.getSearchFilterValues();
      expect(searchFilterValue.get('muscleGroup')).toBe(muscleGroupValue);
    });
  });

  describe('pageLimitClick()', () => {
    it('should set the page item limit', () => {
      const limit = 99;
      spyOn(lss, 'set');
      const setDataFromPaginationService = spyOn<any>(component, 'setDataFromPaginationService');

      component.pageLimitClick(limit);
      expect(component.pageItemLimit).toBe(limit);
      expect(lss.set).toHaveBeenCalledWith(lss.exerciseTable.pageItemLimit, limit);
      expect(component.currentPage).toBe(1);
      expect(setDataFromPaginationService).toHaveBeenCalled();
    });
  });

  describe('changeSort()', () => {
    it('should change sort field', () => {
      const field = 'sortFieldValue';
      spyOn(component, 'loadExercises');

      component.changeSort(field);
      expect(component.sortDirection).toBe('asc');
      expect(component.sortField).toBe(field);
      expect(component.loadExercises).toHaveBeenCalled();
    });

    it('should change sort field and toggle direction to desc', () => {
      const field = 'sortFieldValue';
      component.sortField = field;
      component.sortDirection = 'asc';
      spyOn(component, 'loadExercises');

      component.changeSort(field);
      expect(component.sortDirection).toBe('desc');
      expect(component.sortField).toBe(field);
      expect(component.loadExercises).toHaveBeenCalled();
    });

    it('should change sort field and toggle direction to asc', () => {
      const field = 'sortFieldValue';
      component.sortField = field;
      component.sortDirection = 'desc';
      spyOn(component, 'loadExercises');

      component.changeSort(field);
      expect(component.sortDirection).toBe('asc');
      expect(component.sortField).toBe(field);
      expect(component.loadExercises).toHaveBeenCalled();
    });
  });

  describe('filter()', () => {
    it('should set exercise type search filter', () => {
      const term = 'filterTerm';
      const field = 'type';
      spyOn(lss, 'set');
      spyOn(component, 'loadExercises');
      spyOn(component, 'loadUniqueFieldValues');

      component.filter(term, field);

      expect(component.searchFilters.get(field)).toBe(term);
      expect(lss.set).toHaveBeenCalledWith(lss.exerciseTable.selectedTypeFilter, term);
      expect(component.loadExercises).toHaveBeenCalled();
      expect(component.loadUniqueFieldValues).toHaveBeenCalled();
      expect(component.currentPage).toBe(1);
    });

    it('should set muscle group search filter', () => {
      const term = 'filterTerm';
      const field = 'muscleGroup';
      spyOn(lss, 'set');
      spyOn(component, 'loadExercises');
      spyOn(component, 'loadUniqueFieldValues');

      component.filter(term, field);

      expect(component.searchFilters.get(field)).toBe(term);
      expect(lss.set).toHaveBeenCalledWith(lss.exerciseTable.selectedMuscleGroupFilter, term);
      expect(component.loadExercises).toHaveBeenCalled();
      expect(component.loadUniqueFieldValues).toHaveBeenCalled();
      expect(component.currentPage).toBe(1);
    });
  });

  describe('clearFilter()', () => {
    it('should clear exercise type search filter', () => {
      const field = 'type'
      spyOn(lss, 'remove');
      spyOn(component, 'loadExercises');
      spyOn(component, 'loadUniqueFieldValues');

      component.clearFilter(field);
      expect(component.searchFilters.get(field)).toBe(undefined);
      expect(lss.remove).toHaveBeenCalledWith(lss.exerciseTable.selectedTypeFilter);
      expect(component.loadExercises).toHaveBeenCalled();
      expect(component.loadUniqueFieldValues).toHaveBeenCalled();
      expect(component.currentPage).toBe(1);
    });

    it('should clear muscle group search filter', () => {
      const field = 'muscleGroup'
      spyOn(lss, 'remove');
      spyOn(component, 'loadExercises');
      spyOn(component, 'loadUniqueFieldValues');

      component.clearFilter(field);
      expect(component.searchFilters.get(field)).toBe(undefined);
      expect(lss.remove).toHaveBeenCalledWith(lss.exerciseTable.selectedMuscleGroupFilter);
      expect(component.loadExercises).toHaveBeenCalled();
      expect(component.loadUniqueFieldValues).toHaveBeenCalled();
      expect(component.currentPage).toBe(1);
    });
  });

  describe('clearAllfilters()', () => {
    it('should clear all filters', () => {
      spyOn(component, 'clearFilter');

      component.clearAllfilters();
      expect(component.clearFilter).toHaveBeenCalledTimes(2);
      expect(component.clearFilter).toHaveBeenCalledWith('type');
      expect(component.clearFilter).toHaveBeenCalledWith('muscleGroup');
    });
  });

  describe('addClick()', () => {
    it('should prepare for Add Form', () => {
      const exercise = emptyExerciseObject();

      component.addClick();
      expect(component.formType).toBe(FormType.add);
      expect(component.exercise).toEqual(exercise);
    });
  });

  describe('editClick()', () => {
    it('should prepare for Edit Form', () => {
      const exercise = emptyExerciseObject();

      component.editClick(exercise);
      expect(component.formType).toBe(FormType.edit);
      expect(component.exercise).toEqual(exercise);
    });
  });

  describe('deleteClick()', () => {
    it('should prepare for Delete Form', () => {
      const exercise = emptyExerciseObject();

      component.deleteClick(exercise);
      expect(component.formType).toBe(FormType.delete);
      expect(component.exercise).toEqual(exercise);
    });
  });

  describe('private getShowSearchFilters()', () => {
    it('should return true when showFilters is not null and does not equal \'false\'', () =>{
      spyOn(lss, 'get').and.returnValue('true');
      fixture = TestBed.createComponent(ExercisesComponent);
      component = fixture.componentInstance;
      fixture.detectChanges(); 
      expect(component.showSearchFilters).toBeTruthy();
    });
  });
});
