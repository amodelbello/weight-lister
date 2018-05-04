import * as Rx from 'rxjs/Rx';
import { async, fakeAsync,ComponentFixture, TestBed, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { FormInteractionService } from '../../../services/interaction/form.service'

import { ExerciseSetComponent } from './exercise-set.component';

describe('ExerciseSetComponent', () => {
  let component: ExerciseSetComponent;
  let fixture: ComponentFixture<ExerciseSetComponent>;
  let formInteractionService: FormDataEntryValue;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        ExerciseSetComponent,
      ],
      imports: [
        FormsModule,
      ],
      providers: [
        FormInteractionService,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExerciseSetComponent);
    component = fixture.componentInstance;
    formInteractionService = TestBed.get(FormInteractionService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('initSetFormSubscription()', () => {
    it('should set editMode to false', fakeAsync(() => {
      spyOn<any>(formInteractionService, 'getSetFormObservable').and.returnValue(Rx.Observable.of('data'));

      component.initSetFormSubscription();
      tick();

      expect(component.editMode).toBeFalsy();
    }));
  });

  // TODO: Figure out how to programmatically trigger escape event
  // describe('ngOnInit()', () => {
  //   it('should call formInteractionService.disableOtherSetForms on escape key up', fakeAsync(() => {

  //     const event = new KeyboardEvent("keyup",{
  //       "key": "Escape"
  //     });

  //     component.ngOnInit();
  //     tick();
  //     document.dispatchEvent(event);
  //     tick();

  //   }));
  // });

  describe('editClick()', () => {
    it('should disable other exercise-set forms when editMode is false', () => {
      component.editMode = false;
      const initFormSubscription = spyOn<any>(component, 'initSetFormSubscription');
      const disableOtherSetForms = spyOn<any>(formInteractionService, 'disableOtherSetForms');

      component.editClick();
      fixture.detectChanges();
      expect(initFormSubscription).toHaveBeenCalled();
      expect(disableOtherSetForms).toHaveBeenCalledWith(component.index);
      expect(component.editMode).toBeTruthy();
    });
  });

  describe('saveClick()', () => {
    it('should emit saveEvent', () => {
      const set = {
        reps: 'reps',
        weight: 'weight'
      }

      spyOn(component.setFormSubscription$, 'unsubscribe');
      spyOn(component.saveEvent, 'emit');

      component.saveClick(set);

      expect(component.saveEvent.emit).toHaveBeenCalled();
      expect(component.editMode).toBeFalsy();
      expect(component.setFormSubscription$.unsubscribe).toHaveBeenCalled();
    });
  });

  describe('deleteClick()', () => {
    it('should emit deleteEvent', () => {
      const index = 'indexValue';
      spyOn(component.deleteEvent, 'emit');
      const disableOtherSetForms = spyOn<any>(formInteractionService, 'disableOtherSetForms');

      component.deleteClick(index);
      expect(component.deleteEvent.emit).toHaveBeenCalledWith(index);
      expect(disableOtherSetForms).toHaveBeenCalledWith(component.index);
    });
  });
});
