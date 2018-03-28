export interface Workout {
  id: string;
  date: string;
  isActive: boolean;
}

export function emptyWorkoutObject(): Workout {
  const emptyWorkout: Workout = {
    id: '',
    date: '',
    isActive: false,
  }

  return emptyWorkout;
}
