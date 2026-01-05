import React, { createContext, useContext, ReactNode } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Routine, Exercise, STORAGE_KEYS } from '../types';
import { generateId } from '../utils/generateId';

interface RoutineContextType {
  routines: Routine[];
  createRoutine: (name: string, description?: string) => Routine;
  updateRoutine: (id: string, updates: Partial<Routine>) => void;
  deleteRoutine: (id: string) => void;
  getRoutineById: (id: string) => Routine | undefined;
  addExerciseToRoutine: (routineId: string, exercise: Omit<Exercise, 'id'>) => void;
  updateExerciseInRoutine: (routineId: string, exerciseId: string, updates: Partial<Exercise>) => void;
  removeExerciseFromRoutine: (routineId: string, exerciseId: string) => void;
}

const RoutineContext = createContext<RoutineContextType | undefined>(undefined);

export function RoutineContextProvider({ children }: { children: ReactNode }) {
  const [routines, setRoutines] = useLocalStorage<Routine[]>(
    STORAGE_KEYS.ROUTINES,
    []
  );

  const createRoutine = (name: string, description?: string): Routine => {
    const newRoutine: Routine = {
      id: generateId(),
      name,
      description,
      exercises: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setRoutines((prev) => [...prev, newRoutine]);
    return newRoutine;
  };

  const updateRoutine = (id: string, updates: Partial<Routine>) => {
    setRoutines((prev) =>
      prev.map((routine) =>
        routine.id === id
          ? { ...routine, ...updates, updatedAt: new Date().toISOString() }
          : routine
      )
    );
  };

  const deleteRoutine = (id: string) => {
    if (confirm('Are you sure you want to delete this routine?')) {
      setRoutines((prev) => prev.filter((routine) => routine.id !== id));
    }
  };

  const getRoutineById = (id: string): Routine | undefined => {
    return routines.find((routine) => routine.id === id);
  };

  const addExerciseToRoutine = (routineId: string, exercise: Omit<Exercise, 'id'>) => {
    const newExercise: Exercise = {
      id: generateId(),
      ...exercise,
    };

    setRoutines((prev) =>
      prev.map((routine) =>
        routine.id === routineId
          ? {
              ...routine,
              exercises: [...routine.exercises, newExercise],
              updatedAt: new Date().toISOString(),
            }
          : routine
      )
    );
  };

  const updateExerciseInRoutine = (
    routineId: string,
    exerciseId: string,
    updates: Partial<Exercise>
  ) => {
    setRoutines((prev) =>
      prev.map((routine) =>
        routine.id === routineId
          ? {
              ...routine,
              exercises: routine.exercises.map((ex) =>
                ex.id === exerciseId ? { ...ex, ...updates } : ex
              ),
              updatedAt: new Date().toISOString(),
            }
          : routine
      )
    );
  };

  const removeExerciseFromRoutine = (routineId: string, exerciseId: string) => {
    setRoutines((prev) =>
      prev.map((routine) =>
        routine.id === routineId
          ? {
              ...routine,
              exercises: routine.exercises.filter((ex) => ex.id !== exerciseId),
              updatedAt: new Date().toISOString(),
            }
          : routine
      )
    );
  };

  return (
    <RoutineContext.Provider
      value={{
        routines,
        createRoutine,
        updateRoutine,
        deleteRoutine,
        getRoutineById,
        addExerciseToRoutine,
        updateExerciseInRoutine,
        removeExerciseFromRoutine,
      }}
    >
      {children}
    </RoutineContext.Provider>
  );
}

export function useRoutineContext() {
  const context = useContext(RoutineContext);
  if (!context) {
    throw new Error('useRoutineContext must be used within RoutineContextProvider');
  }
  return context;
}
