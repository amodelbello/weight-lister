import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { FormType } from '../../models/FormType';
import { ExerciseService } from '../../services/exercise/exercise.service';
import { Exercise, emptyExerciseObject  } from '../../models/Exercise';
import { FlashMessagesService } from 'angular2-flash-messages';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-exercise-form',
  templateUrl: './exercise-form.component.html',
  styleUrls: ['./exercise-form.component.scss']
})
export class ExerciseFormComponent implements OnInit {

  @Input() type: FormType;
  @Input() exercise: Exercise = emptyExerciseObject();
  @ViewChild('exerciseForm') form: HTMLFormElement;
  @ViewChild('closeModel') closeButton: ElementRef;

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

    this.exerciseForm.reset();
  }

  private formSubmitAdd(data) {
    data.isActive = true;
    this.exerciseService.createExercise(data).subscribe(data => {
      this.closeButton.nativeElement.click();
      this.flashMessage.show('Exercise Saved', { cssClass: 'alert-info', timeout: 4000 });
    });
  }

  private formSubmitEdit(data) {
    this.exerciseService.updateExercise(data).subscribe(data => {
      this.closeButton.nativeElement.click();
      this.flashMessage.show('Exercise Saved', { cssClass: 'alert-info', timeout: 4000 });
    });
  }

  private formSubmitRemove(data) {
    data.isActive = false;
    this.exerciseService.updateExercise(data).subscribe(data => {
      this.closeButton.nativeElement.click();
      this.flashMessage.show('Exercise Removed', { cssClass: 'alert-warning', timeout: 4000 });
    });
  }

}
