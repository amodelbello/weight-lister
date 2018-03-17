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

  isLoading: boolean = true;
  allExercises: Exercise[];
  exercises: Exercise[];
  sortField: string = 'name';
  sortDirection: OrderByDirection = 'asc';
  currentPage: number = 1;
  pageItemLimit: number = 10;
  numberOfPages: number = 0;
  arrayOfPages: Array<number>;
  totalNumberOfExercises: number = 0;

  // Current exercise being edited via modal
  exercise: Exercise = emptyExerciseObject();
  formType: FormType;

  constructor(
    private exerciseService: ExerciseService,
    private userService: UserService,
  ) { }

  ngOnInit() {
    this.exerciseService.getExercises(this.sortField, this.sortDirection).subscribe(exercises => {
      this.allExercises = exercises;
      this.exercises = this.pagination(this.allExercises);
      this.isLoading = false;
    });

    this.isLoading = true;
    this.formType = FormType.add;
  }
  
  private pagination(exercises: Exercise[]): Exercise[] {
    this.totalNumberOfExercises = exercises.length;
    this.numberOfPages          = Math.ceil((this.totalNumberOfExercises / this.pageItemLimit));
    this.arrayOfPages           = Array.from(Array(this.numberOfPages),(x,i)=>i + 1)
    let start: number           = this.currentPage === 1 ? 1 : ((this.currentPage -1) * this.pageItemLimit);
    let end: number             = start + this.pageItemLimit;

    return exercises.slice(start, end);
  }

  pageClick(page: number) {
    if (page < 1) page = 1;
    if (page > this.numberOfPages) page = this.numberOfPages;

    this.currentPage = page;
    this.exercises = this.pagination(this.allExercises);
  }

  pageLimitClick(limit: number) {
    this.pageItemLimit = limit;
    this.currentPage = 1;
    this.exercises = this.pagination(this.allExercises);
  }

  sortClick(field) {
    this.sortDirection = this.determineSortDirection(field);
    this.sortField = field;
    this.exerciseService.getExercises(this.sortField, this.sortDirection).subscribe(exercises => {
      this.allExercises = exercises;
      this.exercises = this.pagination(this.allExercises);
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
