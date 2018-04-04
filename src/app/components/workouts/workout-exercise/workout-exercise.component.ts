import { Component, OnInit, Input } from '@angular/core';
import { WorkoutExercise, emptyWorkoutExerciseObject } from '../../../models/WorkoutExercise'

@Component({
  selector: 'app-workout-exercise',
  templateUrl: './workout-exercise.component.html',
  styleUrls: ['./workout-exercise.component.scss']
})
export class WorkoutExerciseComponent implements OnInit {

  @Input() workoutExercise: WorkoutExercise = emptyWorkoutExerciseObject();

  constructor() {
  }

  ngOnInit() {
  }

  addClick() {
  }

  editClick() {
  }

  deleteClick() {
  }
}
