import { Component, OnInit } from '@angular/core';
import { ExerciseService } from '../../services/exercise/exercise.service';
import { Exercise, emptyExerciseObject } from '../../models/Exercise';

import { UserService } from '../../services/user/user.service';
import { User } from '../../models/User';

@Component({
  selector: 'app-exercises',
  templateUrl: './exercises.component.html',
  styleUrls: ['./exercises.component.scss']
})
export class ExercisesComponent implements OnInit {

  exercises: Exercise[];

  constructor(
    private exerciseService: ExerciseService,
    private userService: UserService,
  ) { }

  ngOnInit() {
    this.exerciseService.getExercises().subscribe(exercises => {
      this.exercises = exercises;
      let emptyExercise = emptyExerciseObject();
    });
  }

}
