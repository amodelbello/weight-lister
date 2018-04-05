import { Component, OnInit, Input } from '@angular/core';
import { WorkoutExercise, emptyWorkoutExerciseObject } from '../../../models/WorkoutExercise'
import { Subscription } from 'rxjs/Subscription';
import { FormInteractionService } from '../../../services/interaction/form.service'
import { WorkoutExerciseService } from '../../../services/workout-exercise/workout-exercise.service';

@Component({
  selector: 'app-workout-exercise',
  templateUrl: './workout-exercise.component.html',
  styleUrls: ['./workout-exercise.component.scss']
})
export class WorkoutExerciseComponent implements OnInit {

  @Input() workoutExercise: WorkoutExercise = emptyWorkoutExerciseObject();
  subscription: Subscription;

  constructor(
    private workoutExerciseService: WorkoutExerciseService,
    private formInteractionService: FormInteractionService,
  ) { 
    this.subscription = this.formInteractionService.getSetFormObservable()
    .subscribe((data) => {
      console.log(this.workoutExercise);
    });
  }

  ngOnInit() {
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

  editClick() {
  }

  deleteClick() {
  }

  save() {
    this.workoutExerciseService.updateWorkoutExercise(this.workoutExercise)
    .subscribe(() => {
      console.log('saved!');
    });
  }
}
