import { Component, OnInit } from '@angular/core';
import { ExerciseService } from '../../services/exercise/exercise.service';
import { Exercise, emptyExerciseObject } from '../../models/Exercise';

import { UserService } from '../../services/user/user.service';
import { User } from '../../models/User';
import { FormType } from '../../models/FormType';
import { OrderByDirection } from '@firebase/firestore-types';
import { PaginationService } from '../../services/pagination/pagination.service';

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
  pageItemLimit: number = this.getPageLimit();
  numberOfPages: number = 0;
  arrayOfPages: Array<number>;

  // Exercise currently being edited by modal form
  exercise: Exercise = emptyExerciseObject();
  formType: FormType;

  constructor(
    private exerciseService: ExerciseService,
    private userService: UserService,
    private paginationService: PaginationService,
  ) { }

  ngOnInit() {
    this.loadExercises();
  }
  
  loadExercises() {
    this.exerciseService.getExercises(this.sortField, this.sortDirection).subscribe(exercises => {
      this.allExercises = exercises;
      this.setDataFromPaginationService();
      this.isLoading = false;
    });

    this.isLoading = true;
    this.formType = FormType.add;
  }

  private getPaginationArguments(): Object {
    return {
      allItems: this.allExercises,
      numberOfPages: this.numberOfPages,
      pageItemLimit: this.getPageLimit(),
      currentPage: this.currentPage,
    }
  }

  private setDataFromPaginationService(): void {
    this.numberOfPages = this.paginationService.getNumberOfPages(this.getPaginationArguments());
    this.arrayOfPages = this.paginationService.convertNumberToArray(this.numberOfPages);
    this.exercises = this.paginationService.getPage(this.getPaginationArguments());
  }

  pageClick(page: number) {
    if (page < 1) page = 1;
    if (page > this.numberOfPages) page = this.numberOfPages;

    this.currentPage = page;
    this.setDataFromPaginationService();
  }

  getPageLimit() {
    let limit = sessionStorage.getItem('exercisePageItemLimit');
    if (limit != null && limit != '') {
      return parseInt(limit);
    }
    return 10;
  }

  pageLimitClick(limit: number) {
    this.pageItemLimit = limit;
    sessionStorage.setItem('exercisePageItemLimit', limit.toString());
    this.currentPage = 1;
    this.setDataFromPaginationService();
  }

  sortClick(field) {
    this.sortDirection = this.determineSortDirection(field);
    this.sortField = field;
    this.exerciseService.getExercises(this.sortField, this.sortDirection).subscribe(exercises => {
      this.allExercises = exercises;
      this.setDataFromPaginationService();
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
