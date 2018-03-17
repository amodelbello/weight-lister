import { Component, OnInit } from '@angular/core';
import { ExerciseService } from '../../services/exercise/exercise.service';
import { Exercise, emptyExerciseObject } from '../../models/Exercise';

import { UserService } from '../../services/user/user.service';
import { User } from '../../models/User';
import { FormType } from '../../models/FormType';
import { OrderByDirection } from '@firebase/firestore-types';

@Component({
  selector: 'app-exercises',
  templateUrl: './exercises.component.html',
  styleUrls: ['./exercises.component.scss']
})
export class ExercisesComponent implements OnInit {

  exercises: Exercise[];
  sortField: string = 'name';
  sortDirection: OrderByDirection = 'asc';
  exercise: Exercise = emptyExerciseObject();
  formType: FormType;

  constructor(
    private exerciseService: ExerciseService,
    private userService: UserService,
  ) { }

  ngOnInit() {
    this.exerciseService.getExercises(this.sortField, this.sortDirection).subscribe(exercises => {
      this.exercises = exercises;
    });

    this.formType = FormType.add;
  }

  sortClick(field) {
    this.sortDirection = this.determineSortDirection(field);
    this.sortField = field;
    this.exerciseService.getExercises(this.sortField, this.sortDirection).subscribe(exercises => {
      this.exercises = exercises;
    });
  }

  private determineSortDirection(newSortField): OrderByDirection {
    let sortDirection: OrderByDirection = 'asc'
    if (this.sortField === newSortField) {
      sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    }

    return sortDirection;
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
