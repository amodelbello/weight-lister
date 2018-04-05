import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
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

  editMode: boolean = false;
  subscription: Subscription;

  constructor(
    private formInteractionService: FormInteractionService
  ) { 
    this.subscription = this.formInteractionService.getSetFormObservable()
    .subscribe((data) => {
      this.editMode = false;
    });
  }

  ngOnInit() {
  }

  addClick() {
  }

  editClick() {
    this.formInteractionService.disableOtherSetForms(this.index);
    this.editMode = true;
  }

  saveClick(set) {
    set = this.coerceSet(set);
    this.saveEvent.emit();
    this.editMode = false;
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
