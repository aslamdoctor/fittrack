import { WorkoutSession } from '../types';

export function calculateTotalVolume(workout: WorkoutSession): number {
  let totalVolume = 0;
  workout.exercises.forEach((exercise) => {
    exercise.sets.forEach((set) => {
      if (set.completed) {
        totalVolume += set.weight * set.reps;
      }
    });
  });
  return totalVolume;
}

export function calculateWorkoutDuration(workout: WorkoutSession): number {
  if (!workout.endTime) return 0;
  const start = new Date(workout.startTime).getTime();
  const end = new Date(workout.endTime).getTime();
  return Math.floor((end - start) / 60000); // minutes
}

export function getWorkoutStreak(history: WorkoutSession[]): number {
  if (history.length === 0) return 0;

  const sortedWorkouts = [...history].sort(
    (a, b) => new Date(b.startTime).getTime() - new Date(a.startTime).getTime()
  );

  let streak = 0;
  let currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);

  for (const workout of sortedWorkouts) {
    const workoutDate = new Date(workout.startTime);
    workoutDate.setHours(0, 0, 0, 0);

    const daysDiff = Math.floor(
      (currentDate.getTime() - workoutDate.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (daysDiff === streak || (streak === 0 && daysDiff === 0)) {
      streak++;
      currentDate = new Date(workoutDate);
    } else if (daysDiff > streak) {
      break;
    }
  }

  return streak;
}

export function getMostFrequentExercise(history: WorkoutSession[]): string | null {
  if (history.length === 0) return null;

  const exerciseCount: Record<string, number> = {};

  history.forEach((workout) => {
    workout.exercises.forEach((exercise) => {
      exerciseCount[exercise.exerciseName] = (exerciseCount[exercise.exerciseName] || 0) + 1;
    });
  });

  let mostFrequent: string | null = null;
  let maxCount = 0;

  Object.entries(exerciseCount).forEach(([name, count]) => {
    if (count > maxCount) {
      maxCount = count;
      mostFrequent = name;
    }
  });

  return mostFrequent;
}

export function getWeeklyStats(history: WorkoutSession[]): {
  workouts: number;
  totalVolume: number;
  totalSets: number;
} {
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

  const weeklyWorkouts = history.filter((workout) => {
    const workoutDate = new Date(workout.startTime);
    return workoutDate >= oneWeekAgo;
  });

  const totalVolume = weeklyWorkouts.reduce((sum, workout) => {
    return sum + calculateTotalVolume(workout);
  }, 0);

  const totalSets = weeklyWorkouts.reduce((sum, workout) => {
    return (
      sum +
      workout.exercises.reduce((exerciseSum, exercise) => {
        return exerciseSum + exercise.sets.filter((set) => set.completed).length;
      }, 0)
    );
  }, 0);

  return {
    workouts: weeklyWorkouts.length,
    totalVolume,
    totalSets,
  };
}
