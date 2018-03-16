import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { FormType } from '../../models/FormType';
import { ExerciseService } from '../../services/exercise/exercise.service';
import { Exercise, emptyExerciseObject  } from '../../models/Exercise';
import { FlashMessagesService } from 'angular2-flash-messages';

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

  constructor(
    private exerciseService: ExerciseService,
    private flashMessage: FlashMessagesService,
  ) { }

  ngOnInit() {
  }

  cancelClick() {
    this.form.reset();
    // this.exercise = emptyExerciseObject();
  }

  onSubmit({value, valid}: {value: Exercise, valid: boolean}) {
    if (valid) {

      switch(this.type) {
        case FormType.add:
          this.formSubmitAdd(value);
          break;

        case FormType.edit:
          this.formSubmitEdit(value);
          break;

        case FormType.delete:
          this.formSubmitDelete(value);
          break;
      }


      // Add id to client
      // value.id = this.id;

      // update client
      // this.clientService.updateClient(value);

      // this.router.navigate(['/client/' + this.id]);
    }
  }

  private formSubmitAdd(data) {
    data.isActive = true;
    this.exerciseService.createExercise(data).subscribe(data => {
      this.closeButton.nativeElement.click();
      this.flashMessage.show('Exercise Saved', { cssClass: 'alert-success', timeout: 4000 });
    });
  }

  private formSubmitEdit(data) {
    console.log('Edit time!')
    console.log(data);
    this.closeButton.nativeElement.click();
  }

  private formSubmitDelete(data) {
    console.log('Delete time!')
    console.log(data);
    this.closeButton.nativeElement.click();
  }

}
