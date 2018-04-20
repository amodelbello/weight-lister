export interface Exercise {
  id: string;
  name: string;
  muscleGroup: string;
  type: string;
  isActive: boolean;
  date?: string;
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