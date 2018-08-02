import { Component, OnInit, Input } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { environment } from '../../../../environments/environment';
import { Exercise, emptyExerciseObject  } from '../../../models/Exercise';
import { WorkoutExercise, emptyWorkoutExerciseObject } from '../../../models/WorkoutExercise'
import { FormInteractionService } from '../../../services/interaction/form.service'
import { ExerciseService } from '../../../services/exercise/exercise.service';
import { WorkoutExerciseService } from '../../../services/workout-exercise/workout-exercise.service';

@Component({
  selector: 'app-workout-exercise',
  templateUrl: './workout-exercise.component.html',
  styleUrls: ['./workout-exercise.component.scss']
})
export class WorkoutExerciseComponent implements OnInit {

  @Input() exercise: Exercise = emptyExerciseObject();
  @Input() workoutExercise: WorkoutExercise = emptyWorkoutExerciseObject();

  constructor(
    private workoutExerciseService: WorkoutExerciseService,
    private exerciseService: ExerciseService,
    private formInteractionService: FormInteractionService,
    private flashMessage: FlashMessagesService,
  ) {}

  ngOnInit() {
    this.exerciseService.getExercise(this.workoutExercise.exerciseId)
    .subscribe((exercise) => {
      this.exercise = exercise;
    })
  }

  addSetClick() {
    this.workoutExercise.sets.push({
      weight: 0,
      reps: 0,
    });
    this.save();
  }

  deleteSet(index) {
    this.workoutExercise.sets.splice(index, 1);
    this.save();
  }

  deleteClick(workoutExercise) {
    this.workoutExerciseService.deleteWorkoutExercise(workoutExercise)
    .subscribe(() => {
      this.flashMessage.show('Exercise Removed From Workout', { cssClass: 'alert-warning', timeout: environment.flashMessageDuration });
    });
  }

  editSet() {
    this.save(true);
  }

  save(isEdit?) {
    this.workoutExerciseService.updateWorkoutExercise(this.workoutExercise)
    .subscribe(() => {
      if (isEdit) {
        const index = (this.workoutExercise.sets.length - 1);
        this.exercise.previous = this.workoutExercise.sets[index];
        this.exerciseService.updateExercise(this.exercise).subscribe(() => {
        });
      }
    });
  }
}
