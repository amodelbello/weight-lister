import { Exercise, emptyExerciseObject } from "./Exercise";
import { Workout } from "./workout";
import { Observable } from 'rxjs/Observable';

export interface WorkoutExercise {
  id: string;
  workoutId: string;
  exerciseId: string;
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
    exerciseId: null,
    exercise: emptyExerciseObject(),
    sets: [],
  }

  return emptyWorkoutExercise;
}
