export interface Exercise {
  id: string;
  name: string;
  muscleGroup: string;
  type: string;
  sort?: number;
  isActive: boolean;
}

export function emptyExerciseObject() {
  const emptyExercise: Exercise = {
    id: '',
    name: '',
    muscleGroup: '',
    type: '',
    sort: null,
    isActive: false,
  }

  return emptyExercise;
}