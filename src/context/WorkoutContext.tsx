import { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { WorkoutSession, ExerciseSession, SetLog, Exercise, STORAGE_KEYS } from '../types';
import { generateId } from '../utils/generateId';
import { loadFromStorage, saveToStorage, clearStorage } from '../utils/storage';

interface WorkoutContextType {
  activeWorkout: WorkoutSession | null;
  startWorkout: (routineId?: string, routineName?: string, exercises?: Exercise[]) => void;
  endWorkout: () => WorkoutSession | null;
  cancelWorkout: () => void;
  logSet: (exerciseId: string, weight: number, reps: number) => void;
  updateSet: (exerciseId: string, setId: string, updates: Partial<SetLog>) => void;
  deleteSet: (exerciseId: string, setId: string) => void;
  toggleSetCompletion: (exerciseId: string, setId: string) => void;
  addExerciseToWorkout: (exercise: Exercise) => void;
  removeExerciseFromWorkout: (exerciseId: string) => void;
  currentExerciseIndex: number;
  setCurrentExerciseIndex: (index: number) => void;
}

const WorkoutContext = createContext<WorkoutContextType | undefined>(undefined);

export function WorkoutContextProvider({ children }: { children: ReactNode }) {
  const [activeWorkout, setActiveWorkout] = useState<WorkoutSession | null>(() => {
    return loadFromStorage<WorkoutSession | null>(STORAGE_KEYS.ACTIVE_WORKOUT, null);
  });
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);

  // Auto-save active workout to localStorage
  useEffect(() => {
    if (activeWorkout) {
      saveToStorage(STORAGE_KEYS.ACTIVE_WORKOUT, activeWorkout);
    } else {
      clearStorage(STORAGE_KEYS.ACTIVE_WORKOUT);
    }
  }, [activeWorkout]);

  const startWorkout = (
    routineId?: string,
    routineName?: string,
    exercises?: Exercise[]
  ) => {
    const exerciseSessions: ExerciseSession[] =
      exercises?.map((ex) => ({
        exerciseId: ex.id,
        exerciseName: ex.name,
        sets: [],
        targetSets: ex.defaultSets,
        targetReps: ex.defaultReps,
        notes: ex.notes,
      })) || [];

    const newWorkout: WorkoutSession = {
      id: generateId(),
      routineId,
      routineName,
      exercises: exerciseSessions,
      startTime: new Date().toISOString(),
      isActive: true,
    };

    setActiveWorkout(newWorkout);
    setCurrentExerciseIndex(0);
  };

  const endWorkout = (): WorkoutSession | null => {
    if (!activeWorkout) return null;

    const completedWorkout: WorkoutSession = {
      ...activeWorkout,
      endTime: new Date().toISOString(),
      isActive: false,
    };

    setActiveWorkout(null);
    setCurrentExerciseIndex(0);
    clearStorage(STORAGE_KEYS.ACTIVE_WORKOUT);

    return completedWorkout;
  };

  const cancelWorkout = () => {
    if (confirm('Are you sure you want to cancel this workout? All progress will be lost.')) {
      setActiveWorkout(null);
      setCurrentExerciseIndex(0);
      clearStorage(STORAGE_KEYS.ACTIVE_WORKOUT);
    }
  };

  const logSet = (exerciseId: string, weight: number, reps: number) => {
    if (!activeWorkout) return;

    const newSet: SetLog = {
      id: generateId(),
      weight,
      reps,
      completed: true,
      timestamp: new Date().toISOString(),
    };

    setActiveWorkout((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        exercises: prev.exercises.map((ex) =>
          ex.exerciseId === exerciseId
            ? { ...ex, sets: [...ex.sets, newSet] }
            : ex
        ),
      };
    });
  };

  const updateSet = (exerciseId: string, setId: string, updates: Partial<SetLog>) => {
    if (!activeWorkout) return;

    setActiveWorkout((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        exercises: prev.exercises.map((ex) =>
          ex.exerciseId === exerciseId
            ? {
                ...ex,
                sets: ex.sets.map((set) =>
                  set.id === setId ? { ...set, ...updates } : set
                ),
              }
            : ex
        ),
      };
    });
  };

  const deleteSet = (exerciseId: string, setId: string) => {
    if (!activeWorkout) return;

    setActiveWorkout((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        exercises: prev.exercises.map((ex) =>
          ex.exerciseId === exerciseId
            ? { ...ex, sets: ex.sets.filter((set) => set.id !== setId) }
            : ex
        ),
      };
    });
  };

  const toggleSetCompletion = (exerciseId: string, setId: string) => {
    if (!activeWorkout) return;

    setActiveWorkout((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        exercises: prev.exercises.map((ex) =>
          ex.exerciseId === exerciseId
            ? {
                ...ex,
                sets: ex.sets.map((set) =>
                  set.id === setId ? { ...set, completed: !set.completed } : set
                ),
              }
            : ex
        ),
      };
    });
  };

  const addExerciseToWorkout = (exercise: Exercise) => {
    if (!activeWorkout) return;

    const newExerciseSession: ExerciseSession = {
      exerciseId: exercise.id,
      exerciseName: exercise.name,
      sets: [],
      targetSets: exercise.defaultSets,
      targetReps: exercise.defaultReps,
      notes: exercise.notes,
    };

    setActiveWorkout((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        exercises: [...prev.exercises, newExerciseSession],
      };
    });
  };

  const removeExerciseFromWorkout = (exerciseId: string) => {
    if (!activeWorkout) return;

    if (confirm('Remove this exercise from the workout?')) {
      setActiveWorkout((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          exercises: prev.exercises.filter((ex) => ex.exerciseId !== exerciseId),
        };
      });

      // Adjust current index if needed
      if (currentExerciseIndex >= activeWorkout.exercises.length - 1) {
        setCurrentExerciseIndex(Math.max(0, activeWorkout.exercises.length - 2));
      }
    }
  };

  return (
    <WorkoutContext.Provider
      value={{
        activeWorkout,
        startWorkout,
        endWorkout,
        cancelWorkout,
        logSet,
        updateSet,
        deleteSet,
        toggleSetCompletion,
        addExerciseToWorkout,
        removeExerciseFromWorkout,
        currentExerciseIndex,
        setCurrentExerciseIndex,
      }}
    >
      {children}
    </WorkoutContext.Provider>
  );
}

export function useWorkoutContext() {
  const context = useContext(WorkoutContext);
  if (!context) {
    throw new Error('useWorkoutContext must be used within WorkoutContextProvider');
  }
  return context;
}
