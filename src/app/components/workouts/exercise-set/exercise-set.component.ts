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

  saveClick(data) {
    this.saveEvent.emit();
    this.editMode = false;
  }

  deleteClick() {
    this.formInteractionService.disableOtherSetForms(this.index);
  }
}
