import * as Rx from 'rxjs/Rx';
import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { LoadingDirective } from '../../../directives/loading.directive';
import { NumberToArrayPipe } from '../../../pipes/number-to-array.pipe';

import { AuthService} from '../../../services/auth/auth.service';
import { StubAuthService } from '../../../services/auth/auth.service.stub';
import { UserService } from '../../../services/user/user.service';
import { StubUserService } from '../../../services/user/user.service.stub';
import { ExerciseService } from '../../../services/exercise/exercise.service';
import { StubExerciseService } from '../../../services/exercise/exercise.service.stub';
import { WorkoutExerciseService } from '../../../services/workout-exercise/workout-exercise.service';
import { StubWorkoutExerciseService } from '../../../services/workout-exercise/workout-exercise.service.stub';
import { SortingService } from '../../../services/sorting/sorting.service';
import { PaginationService } from '../../../services/pagination/pagination.service';
import { FormInteractionService } from '../../../services/interaction/form.service';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { FlashMessagesService } from 'angular2-flash-messages';
import { environment } from '../../../../environments/environment';

import { PageItemLimitComponent } from '../../table/page-item-limit/page-item-limit.component';
import { ColumnHeaderComponent } from '../../table/column-header/column-header.component';
import { PaginationControlsComponent } from '../../table/pagination-controls/pagination-controls.component';
import { FilterFieldComponent } from '../../form/filter-field/filter-field.component';
import { ExerciseSetComponent } from '../../workouts/exercise-set/exercise-set.component';
import { SpinnerComponent } from '../../spinner/spinner.component';
import { WorkoutExerciseComponent } from './workout-exercise.component';

import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { emptyWorkoutExerciseObject } from '../../../models/WorkoutExercise';

describe('WorkoutExerciseComponent', () => {
  let component: WorkoutExerciseComponent;
  let fixture: ComponentFixture<WorkoutExerciseComponent>;
  let flashMessage: FlashMessagesService;
  let workoutExerciseService: WorkoutExerciseService;

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
        ExerciseSetComponent,
        WorkoutExerciseComponent,
      ],
      imports: [
        FormsModule,
      ],
      providers: [
        { provide: ExerciseService, useClass: StubExerciseService },
        { provide: WorkoutExerciseService, useClass: StubWorkoutExerciseService },
        { provide: AuthService, useClass: StubAuthService },
        { provide: UserService, useClass: StubUserService },
        { provide: AngularFirestore, useClass: class {}},
        { provide: AngularFireAuth, useClass: class {}},
        { provide: FlashMessagesService, useClass: class { show = jasmine.createSpy('show'); }},
        SortingService,
        PaginationService,
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
    fixture = TestBed.createComponent(WorkoutExerciseComponent);
    component = fixture.componentInstance;
    workoutExerciseService = TestBed.get(WorkoutExerciseService);
    flashMessage = TestBed.get(FlashMessagesService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('addSetClick()', () => {
    it('should add empty exercise set and save', () => {
      const initialLength = component.workoutExercise.sets.length;
      spyOn(component, 'save');

      component.addSetClick();

      expect(component.workoutExercise.sets.length).toEqual(initialLength + 1);
      expect(component.save).toHaveBeenCalled();
    });
  });

  describe('deleteSet()', () => {
    it('should remove set and save', () => {
      spyOn(component, 'save');

      component.addSetClick();
      expect(component.workoutExercise.sets.length).toEqual(1);

      component.deleteSet(0);
      expect(component.workoutExercise.sets.length).toEqual(0);

      expect(component.save).toHaveBeenCalled();
    });
  });

  describe('deleteClick()', () => {
    it('should call the workout exercise service to delete the workout exercise', fakeAsync(() => {
      const workoutExercise = emptyWorkoutExerciseObject();
      spyOn(workoutExerciseService, 'deleteWorkoutExercise').and.returnValue(Rx.Observable.of(null));

      component.deleteClick(workoutExercise);
      tick();

      expect(workoutExerciseService.deleteWorkoutExercise).toHaveBeenCalledWith(workoutExercise);
      expect(flashMessage.show).toHaveBeenCalledWith(
        'Exercise Removed From Workout', 
        { cssClass: 'alert-warning', timeout: environment.flashMessageDuration }
      );
    }));
  });

  describe('save()', () => {
    it('should use the workout exercise service to update the workout exercise', () => {
      spyOn(workoutExerciseService, 'updateWorkoutExercise').and.returnValue(Rx.Observable.of(null));
      component.save();

      expect(workoutExerciseService.updateWorkoutExercise).toHaveBeenCalledWith(component.workoutExercise);
    });
  });
});
