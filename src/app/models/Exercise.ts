export interface Exercise {
  id: string;
  name: string;
  muscleGroup: string;
  type: string;
  isActive: boolean;
  date?: string;
  previous?: {
    reps: number,
    weight: number,
  };
}

export function emptyExerciseObject(): Exercise {
  const emptyExercise: Exercise = {
    id: '',
    name: '',
    muscleGroup: '',
    type: '',
    isActive: false,
  }

  return emptyExercise;
}