import { Component, OnInit } from '@angular/core';
import { WorkoutService } from '../../../services/workout/workout.service';
import { Workout, emptyWorkoutObject } from '../../../models/Workout';
import { OrderByDirection } from '@firebase/firestore-types';
import { SortingService } from '../../../services/sorting/sorting.service';
import { PaginationService } from '../../../services/pagination/pagination.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-workouts',
  templateUrl: './workouts.component.html',
  styleUrls: ['./workouts.component.scss']
})
export class WorkoutsComponent implements OnInit {

  isLoading: boolean = true;
  userHasWorkouts: boolean = false;
  allWorkouts: Workout[];
  workouts: Workout[];

  sortField: string = 'date';
  sortDirection: OrderByDirection = 'desc';

  currentPage: number = 1;
  pageItemLimit: number = this.getPageLimit();
  numberOfPages: number = 0;

  constructor(
    private workoutService: WorkoutService,
    private paginationService: PaginationService,
    private sortingService: SortingService,
  ) { }

  ngOnInit() {
    this.loadWorkouts();
    this.loadUniqueFieldValues();
  }

  loadWorkouts() {
    this.workoutService.getWorkouts(this.sortField, this.sortDirection)
    .subscribe(workouts => {
      this.allWorkouts = workouts;

      this.setDataFromPaginationService();
      this.isLoading = false;
    });

    this.isLoading = true;
  }

  loadUniqueFieldValues() {
    this.workoutService.getWorkouts().subscribe(workouts => {
      this.userHasWorkouts = (workouts.length > 0);
    });
  }

  private getPaginationArguments(): Object {
    return {
      allItems: this.allWorkouts,
      numberOfPages: this.numberOfPages,
      pageItemLimit: this.getPageLimit(),
      currentPage: this.currentPage,
    }
  }

  private setDataFromPaginationService(): void {
    this.numberOfPages = this.paginationService.getNumberOfPages(this.getPaginationArguments());
    this.workouts = this.paginationService.getPage(this.getPaginationArguments());
  }

  changePage(page: number) {
    if (page < 1) page = 1;
    if (page > this.numberOfPages) page = this.numberOfPages;

    this.currentPage = page;
    this.setDataFromPaginationService();
  }

  private getPageLimit() {
    const limit = null;

    // TODO: This doesn't look right. limit is always null
    if (limit != null && limit != '') {
      // return parseInt(limit);
    }
    return 10;
  }

  changeSort(field) {
    this.sortDirection = this.determineSortDirection(field);
    this.sortField = field;

    this.loadWorkouts();
  }

  private determineSortDirection(newSortField): OrderByDirection {
    let sortDirection: OrderByDirection = 'asc'
    if (this.sortField === newSortField) {
      sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    }

    return sortDirection;
  }
}
