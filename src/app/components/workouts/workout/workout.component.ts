import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormType } from '../../../models/FormType';
import { Workout, emptyWorkoutObject } from '../../../models/Workout';
import { WorkoutExercise, emptyWorkoutExerciseObject } from '../../../models/WorkoutExercise';
import { WorkoutService } from '../../../services/workout/workout.service';
import { WorkoutExerciseService } from '../../../services/workout-exercise/workout-exercise.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { environment } from '../../../../environments/environment';

declare var moment: any;

@Component({
  selector: 'app-workout',
  templateUrl: './workout.component.html',
  styleUrls: ['./workout.component.scss']
})
export class WorkoutComponent implements OnInit {

  @ViewChild('closeModalDelete') closeButtonDelete: ElementRef;
  @ViewChild('closeModalAdd') closeButtonAdd: ElementRef;

  dateFormatDisplay = 'dddd, MM/DD/YYYY, h:mm A';
  formType: FormType = null;
  id: string = null;
  workout: Workout = emptyWorkoutObject();
  workoutExercises: WorkoutExercise[] = [];
  exercisesLoading: boolean = false;

  private submitFunction: Function;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private workoutService: WorkoutService,
    private workoutExerciseService: WorkoutExerciseService,
    private flashMessage: FlashMessagesService,
  ) { }

  ngOnInit() {
    this.formType = this.getFormType();

    if (this.formType === FormType.edit) {
      this.id = this.getWorkoutIdFromUrl();
      this.workoutService.getWorkout(this.id).subscribe((workout) => {
        this.workout = workout;
        this.workout.date = this.formatDate(this.workout.date);
      });

      this.exercisesLoading = true;
      this.workoutExerciseService.getWorkoutExercises(this.id)
      .subscribe((workoutExercises) => {
        this.workoutExercises = workoutExercises;
        this.exercisesLoading = false;
      });
    }
  }

  formatDate(date) {
    return moment(date).format(this.dateFormatDisplay);
  }

  onSubmit({ value, valid }: { value: any, valid: boolean }) {
    if (!valid) {
      this.flashMessage.show('Please fill out the form correctly', { cssClass: 'alert-danger', timeout: environment.flashMessageDuration });
    } else {
      this.submitFunction(value);
    }
  }

  private formSubmitAdd(data) {
    data.isActive = true;
    const addObservable = this.workoutService.createWorkout(data).subscribe(workoutId => {
      this.flashMessage.show('Workout Saved', { cssClass: 'alert-info', timeout: environment.flashMessageDuration });

      this.router.navigate(['/workouts/edit/' + workoutId]);
    });
  }

  private formSubmitEdit(data) {
    const editObservable = this.workoutService.updateWorkout(data).subscribe(data => {
      this.flashMessage.show('Workout Saved', { cssClass: 'alert-info', timeout: environment.flashMessageDuration });
    });
  }

  onDeleteSubmit({ value, valid }: { value: any, valid: boolean }) {
    if (!valid) {
      this.flashMessage.show('Please fill out the form correctly', { cssClass: 'alert-danger', timeout: environment.flashMessageDuration });
    } else {
      this.formSubmitRemove(value);
    }
  }

  private formSubmitRemove(data) {
    data.isActive = false;
    const removeObservable = this.workoutService.updateWorkout(data).subscribe(data => {
      this.closeButtonDelete.nativeElement.click();
      this.flashMessage.show('Workout Removed', { cssClass: 'alert-warning', timeout: environment.flashMessageDuration });

      this.router.navigate(['/workouts']);
    });
  }

  private getFormType(): FormType {

    let url = this.route.hasOwnProperty('snapshot') ? this.route.snapshot.url : [];

    if(url.length > 0 && url[0].path === 'workouts') {

        switch(url[1].path) {

          case 'add':
            this.submitFunction = this.formSubmitAdd;
            return FormType.add;

          case 'edit':
            this.submitFunction = this.formSubmitEdit;
            return FormType.edit;

          default:
            return null;
        }
    } else {
      return null;
    }
  }

  private getWorkoutIdFromUrl(): string {
    return this.route.snapshot.params['id'];
  }

  addWorkoutExercise(exercise) {

    let workoutExercise = emptyWorkoutExerciseObject();
    workoutExercise.workoutId = this.workout.id;
    workoutExercise.exerciseId = exercise.id;

    this.workoutExerciseService.createWorkoutExercise(workoutExercise)
    .subscribe(() => {
      this.closeButtonAdd.nativeElement.click();
    })
  }
}
