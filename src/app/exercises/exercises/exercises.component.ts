import { Component, OnInit } from '@angular/core';
import { ExerciseService } from '../../services/exercise/exercise.service';
import { Exercise, emptyExerciseObject } from '../../models/Exercise';

@Component({
  selector: 'app-exercises',
  templateUrl: './exercises.component.html',
  styleUrls: ['./exercises.component.scss']
})
export class ExercisesComponent implements OnInit {

  exercises: Exercise[];

  constructor(
    private exerciseService: ExerciseService,
  ) { }

  ngOnInit() {
    this.exerciseService.getExercises().subscribe(exercises => {
      this.exercises = exercises;
      console.log(exercises);

      let emptyExercise = emptyExerciseObject();
      console.log(emptyExercise);
    });
  }

}
