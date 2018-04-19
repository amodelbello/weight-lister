import { Component, OnInit } from '@angular/core';
import { ExerciseService } from '../../../services/exercise/exercise.service';
import { Exercise, emptyExerciseObject } from '../../../models/Exercise';
import { User } from '../../../models/User';
import { FormType } from '../../../models/FormType';
import { OrderByDirection } from '@firebase/firestore-types';
import { PaginationService } from '../../../services/pagination/pagination.service';
import { LocalStorageService } from '../../../services/local-storage/local-storage.service';
import { NumberToArrayPipe } from '../../../pipes/number-to-array.pipe';
import { Observable } from '@firebase/util';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-exercises',
  templateUrl: './exercises.component.html',
  styleUrls: ['./exercises.component.scss']
})
export class ExercisesComponent implements OnInit {

  isLoading: boolean = true;
  userHasExercises: boolean = false;
  allExercises: Exercise[];
  exercises: Exercise[];
  exercisesSubscription: Subscription;
  uniqueMuscleGroups: string[];
  uniqueExerciseTypes: string[];

  sortField: string = 'name';
  sortDirection: OrderByDirection = 'asc';

  searchFilters: Map<string, string> = this.getSearchFilterValues();
  showSearchFilters: boolean = this.getShowSearchFilters();

  currentPage: number = 1;
  pageItemLimit: number = this.getPageLimit();
  numberOfPages: number = 0;

  // Exercise currently being edited by modal form
  exercise: Exercise = emptyExerciseObject();
  formType: FormType;

  constructor(
    protected exerciseService: ExerciseService,
    protected paginationService: PaginationService,
    protected lss: LocalStorageService,
  ) { }

  ngOnInit() {
    this.loadExercises();
    this.loadUniqueFieldValues();
  }
  
  loadUniqueFieldValues() {
    this.exerciseService.getExercises().subscribe(exercises => {
      this.userHasExercises = (exercises.length > 0);
      this.uniqueExerciseTypes = this.getUniqueExerciseFieldValues('type', exercises);
      this.uniqueMuscleGroups = this.getUniqueExerciseFieldValues('muscleGroup', exercises);
    });
  }

  loadExercises() {
    // TODO: Do I really have to do this? Need to better understand Observables...
    if (this.exercisesSubscription !== undefined) {
      this.exercisesSubscription.unsubscribe();
    }

    this.exercisesSubscription = this.exerciseService.getExercises(this.sortField, this.sortDirection, this.searchFilters).subscribe(exercises => {
      this.allExercises = exercises;

      this.setDataFromPaginationService();
      this.isLoading = false;
    });

    this.isLoading = true;
    this.formType = FormType.add;
  }

  private getUniqueExerciseFieldValues(field: string, exercises: Exercise[]): string[] {
    let uniqueValues: string[] = [];
    for(const exercise of exercises) {
      const value = exercise[field];
      if (uniqueValues.indexOf(value) === -1) {
        uniqueValues.push(value);
      }
    }

    return uniqueValues.sort();
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
    this.exercises = this.paginationService.getPage(this.getPaginationArguments());
  }

  changePage(page: number) {
    if (page < 1) page = 1;
    if (page > this.numberOfPages) page = this.numberOfPages;

    this.currentPage = page;
    this.setDataFromPaginationService();
  }

  private getShowSearchFilters() {
    const showFilters = this.lss.get(this.lss.exerciseTable.showFilters);
    if (showFilters != null && showFilters != 'false') {
      return true;
    } else {
      return false;
    }
  }

  toggleSearchFilters() {
    const showFilters = this.lss.get(this.lss.exerciseTable.showFilters);
    if (showFilters != null && showFilters != 'false') {
      this.showSearchFilters = false;
      this.lss.set(this.lss.exerciseTable.showFilters, "false");
    } else {
      this.showSearchFilters = true
      this.lss.set(this.lss.exerciseTable.showFilters, "true");
    }
  }

  getSearchFilterValues() {
    let values = new Map();
    const exerciseTypeValues = this.lss.get(this.lss.exerciseTable.selectedTypeFilter);
    if (exerciseTypeValues) {
      values.set('type', exerciseTypeValues);
    }
    const muscleGroupValues = this.lss.get(this.lss.exerciseTable.selectedMuscleGroupFilter);
    if (muscleGroupValues) {
      values.set('muscleGroup', muscleGroupValues);
    }

    return values;
  }

  private getPageLimit() {
    const limit = this.lss.get(this.lss.exerciseTable.pageItemLimit);
    if (limit != null && limit != '') {
      return parseInt(limit);
    }
    return 10;
  }

  pageLimitClick(limit: number) {
    this.pageItemLimit = limit;
    this.lss.set(this.lss.exerciseTable.pageItemLimit, limit);
    this.currentPage = 1;
    this.setDataFromPaginationService();
  }

  changeSort(field) {
    this.sortDirection = this.determineSortDirection(field);
    this.sortField = field;

    this.loadExercises();
  }

  private determineSortDirection(newSortField): OrderByDirection {
    let sortDirection: OrderByDirection = 'asc'
    if (this.sortField === newSortField) {
      sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    }

    return sortDirection;
  }

  filter(term: string, field: string) {
    this.searchFilters.set(field, term);

    const lssField = field == 'type' ? this.lss.exerciseTable.selectedTypeFilter : this.lss.exerciseTable.selectedMuscleGroupFilter;
    this.lss.set(lssField, term);

    this.loadExercises();
    this.loadUniqueFieldValues();
    this.currentPage = 1;
  }

  clearFilter(field: string) {
    this.searchFilters.delete(field);
    const lssField = field == 'type' ? this.lss.exerciseTable.selectedTypeFilter : this.lss.exerciseTable.selectedMuscleGroupFilter;
    this.lss.remove(lssField);
    this.loadExercises();
    this.loadUniqueFieldValues();
    this.currentPage = 1;
  }

  clearAllfilters() {
    this.clearFilter('type');
    this.clearFilter('muscleGroup');
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
