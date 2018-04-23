import { Component, Input, Output, OnInit, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/delay';
import 'rxjs/add/observable/of';
import { FormInteractionService } from '../../../services/interaction/form.service'

@Component({
  selector: '[app-exercise-set]',
  templateUrl: './exercise-set.component.html',
  styleUrls: ['./exercise-set.component.scss']
})
export class ExerciseSetComponent implements OnInit {

  @Input() set: {
    reps: number,
    weight: number;
  };
  @Input() index: number;
  @Output() saveEvent: EventEmitter<null> = new EventEmitter<null>();
  @Output() deleteEvent: EventEmitter<null> = new EventEmitter<null>();

  @ViewChild('repsInput') repsInput: ElementRef;
  @ViewChild('weightInput') weightInput: ElementRef;

  editMode: boolean = false;
  enterKeySubscription$: Subscription;
  setFormSubscription$: Subscription;
  myObservable$: Observable<any>;

  constructor(
    private formInteractionService: FormInteractionService
  ) { 
    this.initSetFormSubscription();
  }

  initSetFormSubscription() {
    this.setFormSubscription$ = this.formInteractionService.getSetFormObservable()
    .subscribe((data) => {
      this.editMode = false;
    });
  }

  ngOnInit() {
    // Escape key should cancel exercise set form
    Observable.fromEvent(document, 'keyup')
    .debounceTime(100)
    .pluck('keyCode')

    // escape key
    .filter(code => code === 27)

    .subscribe((code) => {
      this.formInteractionService.disableOtherSetForms(0);
    });
  }

  editClick() {
    this.initSetFormSubscription();

    if (this.editMode === false) {
      this.formInteractionService.disableOtherSetForms(this.index);
      this.editMode = true;

      // Save on Return keyup
      this.enterKeySubscription$ = Observable
      .of(1)
      .delay(100)
      .do(() => {
        this.weightInput.nativeElement.focus()
        this.weightInput.nativeElement.select();
      })
      .map(() => {
        return Observable.fromEvent(this.repsInput.nativeElement, 'keyup')
        .merge(Observable.fromEvent(this.weightInput.nativeElement, 'keyup'))
        .pluck('keyCode');
      })
      .switch()
      .subscribe((code: number) => {
        // Return key code
        if (code === 13) {
          this.saveClick(this.set);
        }
      }); 
    }
  }

  saveClick(set) {
    set = this.coerceSet(set);
    this.saveEvent.emit();
    this.editMode = false;

    this.setFormSubscription$.unsubscribe();
    if (this.enterKeySubscription$ !== undefined) {
      this.enterKeySubscription$.unsubscribe();
    }
  }

  private coerceSet(set) {
    if (isNaN(set.reps)) set.reps = 0;
    if (isNaN(set.weight)) set.weight = 0;

    return set;
  }

  deleteClick(index) {
    this.deleteEvent.emit(index);
    this.formInteractionService.disableOtherSetForms(this.index);
  }
}
