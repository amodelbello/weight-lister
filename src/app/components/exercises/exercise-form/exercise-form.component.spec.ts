import * as Rx from 'rxjs/Rx';
import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { FlashMessagesService } from 'angular2-flash-messages';
import { environment } from '../../../../environments/environment';

import { ExerciseService } from '../../../services/exercise/exercise.service';
import { SortingService } from '../../../services/sorting/sorting.service';
import { AuthService} from '../../../services/auth/auth.service';
import { StubAuthService } from '../../../services/auth/auth.service.stub';
import { UserService } from '../../../services/user/user.service';
import { StubUserService } from '../../../services/user/user.service.stub';

import { ExerciseFormComponent } from './exercise-form.component';
import { FormType } from '../../../models/FormType';
import { emptyExerciseObject } from '../../../models/Exercise';

describe('ExerciseFormComponent', () => {
  let component: ExerciseFormComponent;
  let fixture: ComponentFixture<ExerciseFormComponent>;
  let flashMessage: FlashMessagesService;
  let exerciseService: ExerciseService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExerciseFormComponent ],
      imports: [ReactiveFormsModule],
      providers: [
        ExerciseService,
        SortingService,
        { provide: FlashMessagesService, useClass: class { show = jasmine.createSpy('show'); }},
        { provide: AngularFirestore, useClass: class {}},
        { provide: AngularFireAuth, useClass: class {}},
        { provide: AuthService, useClass: StubAuthService },
        { provide: UserService, useClass: StubUserService },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExerciseFormComponent);
    component = fixture.componentInstance;
    exerciseService = TestBed.get(ExerciseService);
    flashMessage = TestBed.get(FlashMessagesService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('cancelClick()', () => {
    it('should reset the form on cancel action', () => {
      spyOn(component.exerciseForm, 'reset');
      spyOn(component.exerciseForm, 'setValue');

      component.cancelClick();

      expect(component.exerciseForm.reset).toHaveBeenCalled();
      expect(component.exerciseForm.setValue).toHaveBeenCalledWith(component.exercise);
    });
  });

  describe('onSubmit()', () => {
    it('should add exercise', fakeAsync(() => {
      component.type = FormType.add;
      const data = emptyExerciseObject();
      fixture.detectChanges();

      spyOn(exerciseService, 'createExercise').and.returnValue(Rx.Observable.of({}));
      spyOn(component.closeButton.nativeElement, 'click');

      component.onSubmit();

      expect(component.closeButton.nativeElement.click).toHaveBeenCalled();
      expect(flashMessage.show).toHaveBeenCalledWith(
        'Exercise Saved', 
        { cssClass: 'alert-info', timeout: environment.flashMessageDuration }
      );

    }));

    it('should edit exercise', fakeAsync(() => {
      component.type = FormType.edit;
      const data = emptyExerciseObject();
      fixture.detectChanges();

      spyOn(exerciseService, 'updateExercise').and.returnValue(Rx.Observable.of({}));
      spyOn(component.closeButton.nativeElement, 'click');

      component.onSubmit();

      expect(component.closeButton.nativeElement.click).toHaveBeenCalled();
      expect(flashMessage.show).toHaveBeenCalledWith(
        'Exercise Saved', 
        { cssClass: 'alert-info', timeout: environment.flashMessageDuration }
      );
    }));

    it('should remove exercise', fakeAsync(() => {
      component.type = FormType.delete;
      const data = emptyExerciseObject();
      fixture.detectChanges();

      spyOn(exerciseService, 'updateExercise').and.returnValue(Rx.Observable.of({}));
      spyOn(component.closeButton.nativeElement, 'click');

      component.onSubmit();

      expect(component.closeButton.nativeElement.click).toHaveBeenCalled();
      expect(flashMessage.show).toHaveBeenCalledWith(
        'Exercise Removed', 
        { cssClass: 'alert-warning', timeout: environment.flashMessageDuration }
      );
    }));

    it('should do nothing without the form type being set', () => {
      component.type = null;
      component.onSubmit();
    });
  });
});
