import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ExerciseService } from '../../../services/exercise/exercise.service';
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

  loadWorkoutExercises() {
    this.workoutExerciseService.getLatestWorkoutExercises()
    .subscribe((data) => {

      // Sort by data DESC
      data.sort((a, b) =>{
        return moment(b.date) - moment(a.date);
      });
      console.log(data);
    });
  }

  addWorkoutExerciseClick(exercise) {
    this.addWorkoutExerciseEvent.emit(exercise);
  }
}
