import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { ExerciseService } from '../../../services/exercise/exercise.service';
import { Exercise, emptyExerciseObject } from '../../../models/Exercise';
import { FormType } from '../../../models/FormType';
import { DatePipe } from '@angular/common';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { ExercisesComponent } from '../../exercises/exercises/exercises.component';
import { PaginationService } from '../../../services/pagination/pagination.service';
import { LocalStorageService } from '../../../services/local-storage/local-storage.service';
import { WorkoutExerciseService } from '../../../services/workout-exercise/workout-exercise.service';
import { WorkoutExercise } from '../../../models/WorkoutExercise';

declare var moment: any;

@Component({
  selector: 'app-workout-exercises',
  templateUrl: './workout-exercises.component.html',
  styleUrls: ['./workout-exercises.component.scss']
})
export class WorkoutExercisesComponent extends ExercisesComponent implements OnInit {

  workoutExercises: WorkoutExercise[];

  constructor(
    protected exerciseService: ExerciseService,
    protected paginationService: PaginationService,
    protected lss: LocalStorageService,
    private workoutExerciseService: WorkoutExerciseService,
  ) { 
    super(exerciseService, paginationService, lss);
  }

  ngOnInit() {
    super.ngOnInit();
    this.loadWorkoutExercises();
  }

  @Output() addWorkoutExerciseEvent: EventEmitter<any> = new EventEmitter<any>();
  @Input() workoutId: string;

  loadExercises() {

    const exercises$ = this.exerciseService.getExercises(this.sortField, this.sortDirection, this.searchFilters);
    const workoutExercises$ = this.workoutExerciseService.getLatestWorkoutExercises();
    const currentWorkoutExercises$ = this.workoutExerciseService.getWorkoutExercises(this.workoutId);

    this.exercisesSubscription = Observable.combineLatest(exercises$, workoutExercises$, currentWorkoutExercises$)
    .subscribe(data => {

      let workoutExercises = data[1]

      // Sort by exerciseId then by date
      .sort((a, b) => {
        if (a.exerciseId < b.exerciseId) return -1;
        if (a.exerciseId > b.exerciseId) return 1;
        if (moment(a.date) < moment(b.date)) return 1;
        if (moment(a.date) > moment(b.date)) return -1;
      })
      // Filter out all but latest
      .filter((value, index, array) => {
        return (index === 0) || (value.exerciseId != array[index - 1].exerciseId);
      });

      // Map Workout Exercises to Exercises
      this.allExercises = data[0]
      .map(exercise => {
        const workoutExercise = workoutExercises.find(el => {
          return el.exerciseId === exercise.id;
        });

        exercise.date = (workoutExercise !== undefined) ? workoutExercise.date : '';
        return exercise;
      })

      // Filter out exercises already selected for this workout
      .filter((value) => {
        const found = data[2].find(function(element) {
          console.log(element.exerciseId + ' == ' + value.id);
          return element.exerciseId === value.id;
        });

        const returnValue = (found === undefined) ? true: false;
        console.log('returnValue: ' + returnValue);
        return (found === undefined) ? true: false;
      })

      // Sort by date
      .sort((a, b) => {
        const dateA = a.date != '' ? moment(a.date) : moment(1);
        const dateB = b.date != '' ? moment(b.date) : moment(1);
        return dateA - dateB;
      });

      this.setDataFromPaginationService();
      this.isLoading = false;
    });

    this.isLoading = true;
    this.formType = FormType.add;
  }

  loadWorkoutExercises() {
    this.workoutExerciseService.getLatestWorkoutExercises()
    .subscribe((data) => {

      // Sort by data DESC
      data.sort((a, b) =>{
        return moment(b.date) - moment(a.date);
      });
      // console.log(data);
    });
  }

  addWorkoutExerciseClick(exercise) {
    this.addWorkoutExerciseEvent.emit(exercise);
  }
}
