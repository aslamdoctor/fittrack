import { AppData } from '../types';
import { DEFAULT_SETTINGS } from '../types/storage';

export function loadFromStorage<T>(key: string, fallback: T): T {
  try {
    const item = localStorage.getItem(key);
    if (item === null) {
      return fallback;
    }
    return JSON.parse(item) as T;
  } catch (error) {
    console.error(`Error loading ${key} from localStorage:`, error);
    return fallback;
  }
}

export function saveToStorage<T>(key: string, data: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`Error saving ${key} to localStorage:`, error);
    // Handle quota exceeded error
    if (error instanceof DOMException && error.name === 'QuotaExceededError') {
      alert('Storage quota exceeded. Please clear some data to continue.');
    }
  }
}

export function clearStorage(key: string): void {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`Error clearing ${key} from localStorage:`, error);
  }
}

export function exportAllData(): void {
  try {
    const data: Partial<AppData> = {
      routines: loadFromStorage('fittrack_routines', []),
      workoutHistory: loadFromStorage('fittrack_workout_history', []),
      settings: loadFromStorage('fittrack_settings', DEFAULT_SETTINGS),
    };

    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = `fittrack-backup-${Date.now()}.json`;
    a.click();

    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error exporting data:', error);
    alert('Failed to export data. Please try again.');
  }
}

export function importData(jsonString: string): void {
  try {
    const data = JSON.parse(jsonString) as Partial<AppData>;

    // Validate data structure
    if (!data.routines && !data.workoutHistory && !data.settings) {
      throw new Error('Invalid data format');
    }

    // Save to localStorage
    if (data.routines) {
      saveToStorage('fittrack_routines', data.routines);
    }
    if (data.workoutHistory) {
      saveToStorage('fittrack_workout_history', data.workoutHistory);
    }
    if (data.settings) {
      saveToStorage('fittrack_settings', data.settings);
    }

    alert('Data imported successfully! Reloading app...');
    window.location.reload();
  } catch (error) {
    console.error('Import failed:', error);
    alert('Failed to import data. Please check the file format and try again.');
  }
}

export function clearAllData(): void {
  if (
    confirm(
      'Are you sure you want to clear all data? This action cannot be undone.'
    )
  ) {
    clearStorage('fittrack_routines');
    clearStorage('fittrack_workout_history');
    clearStorage('fittrack_settings');
    clearStorage('fittrack_active_workout');
    alert('All data cleared successfully!');
    window.location.reload();
  }
}
