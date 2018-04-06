import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ExercisesComponent } from '../../exercises/exercises/exercises.component';

@Component({
  selector: 'app-workout-exercises',
  templateUrl: './workout-exercises.component.html',
  styleUrls: ['./workout-exercises.component.scss']
})
export class WorkoutExercisesComponent extends ExercisesComponent implements OnInit {

  ngOnInit() {
    super.ngOnInit();
  }

  @Output() addWorkoutExerciseEvent: EventEmitter<any> = new EventEmitter<any>();

  addWorkoutExerciseClick(exercise) {
    this.addWorkoutExerciseEvent.emit(exercise);
  }
}
