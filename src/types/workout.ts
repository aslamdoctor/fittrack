export interface SetLog {
  id: string;
  weight: number;
  reps: number;
  completed: boolean;
  timestamp: string;
}

export interface ExerciseSession {
  exerciseId: string;
  exerciseName: string;
  sets: SetLog[];
  targetSets: number;
  targetReps: number;
  notes?: string;
}

export interface WorkoutSession {
  id: string;
  routineId?: string;
  routineName?: string;
  exercises: ExerciseSession[];
  startTime: string;
  endTime?: string;
  isActive: boolean;
}

export interface RestTimerState {
  isRunning: boolean;
  remainingSeconds: number;
  totalSeconds: number;
}
