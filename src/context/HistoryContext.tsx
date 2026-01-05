import React, { createContext, useContext, ReactNode } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { WorkoutSession, STORAGE_KEYS } from '../types';

interface HistoryContextType {
  workoutHistory: WorkoutSession[];
  addWorkoutToHistory: (workout: WorkoutSession) => void;
  getWorkoutById: (id: string) => WorkoutSession | undefined;
  deleteWorkout: (id: string) => void;
  clearAllHistory: () => void;
  getRecentWorkouts: (count: number) => WorkoutSession[];
}

const HistoryContext = createContext<HistoryContextType | undefined>(undefined);

export function HistoryContextProvider({ children }: { children: ReactNode }) {
  const [workoutHistory, setWorkoutHistory] = useLocalStorage<WorkoutSession[]>(
    STORAGE_KEYS.WORKOUT_HISTORY,
    []
  );

  const addWorkoutToHistory = (workout: WorkoutSession) => {
    setWorkoutHistory((prev) => [workout, ...prev]);
  };

  const getWorkoutById = (id: string): WorkoutSession | undefined => {
    return workoutHistory.find((workout) => workout.id === id);
  };

  const deleteWorkout = (id: string) => {
    if (confirm('Are you sure you want to delete this workout from history?')) {
      setWorkoutHistory((prev) => prev.filter((workout) => workout.id !== id));
    }
  };

  const clearAllHistory = () => {
    if (
      confirm(
        'Are you sure you want to clear all workout history? This action cannot be undone.'
      )
    ) {
      setWorkoutHistory([]);
    }
  };

  const getRecentWorkouts = (count: number): WorkoutSession[] => {
    return workoutHistory.slice(0, count);
  };

  return (
    <HistoryContext.Provider
      value={{
        workoutHistory,
        addWorkoutToHistory,
        getWorkoutById,
        deleteWorkout,
        clearAllHistory,
        getRecentWorkouts,
      }}
    >
      {children}
    </HistoryContext.Provider>
  );
}

export function useHistoryContext() {
  const context = useContext(HistoryContext);
  if (!context) {
    throw new Error('useHistoryContext must be used within HistoryContextProvider');
  }
  return context;
}
