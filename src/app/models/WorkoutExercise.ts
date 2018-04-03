import { Exercise, emptyExerciseObject } from "./Exercise";
import { Workout } from "./workout";
import { Observable } from 'rxjs/Observable';
// import { Observable } from 'rxjs/Observable';

export interface WorkoutExercise {
  id: string;
  workoutId: string;
  workout: Workout;
  exerciseId: string;
  exerciseObservable: Observable<Exercise>;
  exercise: Exercise;
  sets: {
    reps: number,
    weight: number,
  }[];
}

export function emptyWorkoutExerciseObject(): WorkoutExercise {
  const emptyWorkoutExercise: WorkoutExercise = {
    id: '',
    workoutId: null,
    workout: null,
    exerciseId: null,
    exerciseObservable: null,
    exercise: emptyExerciseObject(),
    sets: null,
  }

  return emptyWorkoutExercise;
}
