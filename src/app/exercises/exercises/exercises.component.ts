import { Component, OnInit } from '@angular/core';
import { ExerciseService } from '../../services/exercise/exercise.service';
import { Exercise, emptyExerciseObject } from '../../models/Exercise';

import { UserService } from '../../services/user/user.service';
import { User } from '../../models/User';
import { FormType } from '../../models/FormType';

@Component({
  selector: 'app-exercises',
  templateUrl: './exercises.component.html',
  styleUrls: ['./exercises.component.scss']
})
export class ExercisesComponent implements OnInit {

  exercises: Exercise[];
  exercise: Exercise = emptyExerciseObject();
  formType: FormType;

  constructor(
    private exerciseService: ExerciseService,
    private userService: UserService,
  ) { }

  ngOnInit() {
    this.exerciseService.getExercises().subscribe(exercises => {
      this.exercises = exercises;
    });

    this.formType = FormType.add;
  }

  addClick() {
    this.formType = FormType.add;
    this.exercise = emptyExerciseObject();
  }

  editClick(exercise) {
    this.formType = FormType.edit;
    this.exercise = exercise;
  }

  deleteClick(exercise) {
    this.formType = FormType.delete;
    this.exercise = exercise;
  }

}
