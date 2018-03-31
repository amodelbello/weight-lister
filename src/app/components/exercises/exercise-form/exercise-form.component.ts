import { Component, OnInit, Input, Output, ViewChild, ElementRef, EventEmitter } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { FormType } from '../../../models/FormType';
import { ExerciseService } from '../../../services/exercise/exercise.service';
import { Exercise, emptyExerciseObject  } from '../../../models/Exercise';
import { FlashMessagesService } from 'angular2-flash-messages';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TitleCasePipe } from '../../../pipes/title-case.pipe';

@Component({
  selector: 'app-exercise-form',
  templateUrl: './exercise-form.component.html',
  styleUrls: ['./exercise-form.component.scss']
})
export class ExerciseFormComponent implements OnInit {

  @Input() type: FormType;
  @Input() exercise: Exercise = emptyExerciseObject();
  @Output() saveEvent: EventEmitter<null> = new EventEmitter<null>();
  @ViewChild('exerciseForm') form: HTMLFormElement;
  @ViewChild('closeModal') closeButton: ElementRef;

  exerciseForm: FormGroup;

  constructor(
    private exerciseService: ExerciseService,
    private flashMessage: FlashMessagesService,
    private formBuilder: FormBuilder,
  ) { 
    this.exerciseForm = this.formBuilder.group({
      id: [''],
      name: ['', [Validators.required, Validators.minLength(2)]],
      muscleGroup: ['', [Validators.required, Validators.minLength(2)]],
      type: ['', [Validators.required, Validators.minLength(2)]],
      isActive: [''],
    });
  }

  ngOnInit() {
  }

  ngOnChanges() {
    this.exerciseForm.setValue(this.exercise);
  }

  cancelClick() {
    this.exerciseForm.reset();
    this.exerciseForm.setValue(this.exercise);
  }

  onSubmit() {

    let data = this.exerciseForm.value;
    switch(this.type) {
      case FormType.add:
        this.formSubmitAdd(data);
        break;

      case FormType.edit:
        this.formSubmitEdit(data);
        break;

      case FormType.delete:
        this.formSubmitRemove(data);
        break;
      
      default:
        break;
    }

    this.saveEvent.emit();
    this.exerciseForm.reset();
  }

  private formSubmitAdd(data) {
    data.isActive = true;
    const addObservable = this.exerciseService.createExercise(data).subscribe(data => {
      this.closeButton.nativeElement.click();
      this.flashMessage.show('Exercise Saved', { cssClass: 'alert-info', timeout: environment.flashMessageDuration });
      addObservable.unsubscribe();
    });
  }

  private formSubmitEdit(data) {
    const editObservable = this.exerciseService.updateExercise(data).subscribe(data => {
      this.closeButton.nativeElement.click();
      this.flashMessage.show('Exercise Saved', { cssClass: 'alert-info', timeout: environment.flashMessageDuration });
      editObservable.unsubscribe();
    });
  }

  private formSubmitRemove(data) {
    data.isActive = false;
    const removeObservable = this.exerciseService.updateExercise(data).subscribe(data => {
      this.closeButton.nativeElement.click();
      this.flashMessage.show('Exercise Removed', { cssClass: 'alert-warning', timeout: environment.flashMessageDuration });
      removeObservable.unsubscribe();
    });
  }
}
