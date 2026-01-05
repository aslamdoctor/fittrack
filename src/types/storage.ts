import { Routine } from './routine';
import { WorkoutSession } from './workout';

export interface AppSettings {
  defaultRestTime: number;
  autoStartTimer: boolean;
  soundEnabled: boolean;
  accentColor: 'lime' | 'cyan';
  weightUnit: 'lbs' | 'kg';
}

export interface AppData {
  routines: Routine[];
  workoutHistory: WorkoutSession[];
  settings: AppSettings;
}

export const STORAGE_KEYS = {
  ROUTINES: 'fittrack_routines',
  WORKOUT_HISTORY: 'fittrack_workout_history',
  SETTINGS: 'fittrack_settings',
  ACTIVE_WORKOUT: 'fittrack_active_workout',
} as const;

export const DEFAULT_SETTINGS: AppSettings = {
  defaultRestTime: 90,
  autoStartTimer: true,
  soundEnabled: true,
  accentColor: 'lime',
  weightUnit: 'lbs',
};
