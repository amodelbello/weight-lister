import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ExerciseService } from '../../../services/exercise/exercise.service';
import { Exercise, emptyExerciseObject } from '../../../models/Exercise';
import { FormType } from '../../../models/FormType';
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

  loadExercises() {

    const exercises$ = this.exerciseService.getExercises(this.sortField, this.sortDirection, this.searchFilters);
    const workoutExercises$ = this.workoutExerciseService.getLatestWorkoutExercises();

    Observable.combineLatest(exercises$, workoutExercises$)
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
      let exercises = data[0]
      .map(exercise => {
        const workoutExercise = workoutExercises.find(el => {
          return el.exerciseId === exercise.id;
        });

        exercise.date = (workoutExercise !== undefined) ? workoutExercise.date : '';
        return exercise;
      })
      // Sort by date
      .sort((a, b) => {
        console.log(a.name + ': ' + a.date);
        console.log(b.name + ': ' + b.date);
        return moment(a.date) - moment(b.date);
      });

      // 3. Map dates to exercises
      // 4. Sort exercises by date ASC
      // 5. Filter out exercises already included in current workout

      console.log('Combine Latest');
      console.log(exercises);
      console.log(workoutExercises);
    });


    this.exercisesSubscription = this.exerciseService.getExercises(this.sortField, this.sortDirection, this.searchFilters).subscribe(exercises => {
      this.allExercises = exercises;

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
