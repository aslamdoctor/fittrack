import React, { useMemo } from 'react';
import { Card, CardHeader, CardTitle, CardBody } from '../ui/Card';
import { WorkoutSession } from '../../types';
import { getWeeklyStats, getWorkoutStreak, getMostFrequentExercise } from '../../utils/calculations';
import { TrendingUp, Calendar, Flame, Dumbbell } from 'lucide-react';

interface StatsOverviewProps {
  workoutHistory: WorkoutSession[];
}

export const StatsOverview = React.memo(function StatsOverview({ workoutHistory }: StatsOverviewProps) {
  const weeklyStats = useMemo(() => getWeeklyStats(workoutHistory), [workoutHistory]);
  const streak = useMemo(() => getWorkoutStreak(workoutHistory), [workoutHistory]);
  const mostFrequent = useMemo(() => getMostFrequentExercise(workoutHistory), [workoutHistory]);

  const stats = [
    {
      icon: <Calendar size={28} />,
      value: weeklyStats.workouts,
      label: 'Workouts This Week',
      color: 'var(--color-accent)',
    },
    {
      icon: <Dumbbell size={28} />,
      value: weeklyStats.totalSets,
      label: 'Total Sets',
      color: 'var(--color-accent)',
    },
    {
      icon: <TrendingUp size={28} />,
      value: weeklyStats.totalVolume.toLocaleString(),
      label: 'Total Volume',
      color: 'var(--color-accent)',
    },
    {
      icon: <Flame size={28} />,
      value: streak,
      label: 'Day Streak',
      color: streak > 0 ? 'var(--color-success)' : 'var(--color-text-muted)',
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Stats</CardTitle>
      </CardHeader>
      <CardBody>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
            gap: 'var(--space-md)',
          }}
        >
          {stats.map((stat, index) => (
            <div
              key={index}
              style={{
                padding: 'var(--space-lg)',
                background: 'var(--color-surface)',
                borderRadius: 'var(--radius-md)',
                textAlign: 'center',
                transition: 'all var(--transition-fast)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.background = 'var(--color-surface-hover)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.background = 'var(--color-surface)';
              }}
            >
              <div style={{ color: stat.color, marginBottom: 'var(--space-sm)' }}>
                {stat.icon}
              </div>
              <div
                style={{
                  fontSize: 'var(--font-size-3xl)',
                  fontWeight: 'var(--font-weight-black)',
                  color: stat.color,
                  marginBottom: 'var(--space-xs)',
                }}
              >
                {stat.value}
              </div>
              <div
                style={{
                  fontSize: 'var(--font-size-xs)',
                  color: 'var(--color-text-muted)',
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {mostFrequent && (
          <div
            style={{
              marginTop: 'var(--space-lg)',
              padding: 'var(--space-md)',
              background: 'rgba(204, 255, 0, 0.1)',
              borderRadius: 'var(--radius-md)',
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)' }}>
              Most Frequent Exercise
            </div>
            <div
              style={{
                fontSize: 'var(--font-size-lg)',
                fontWeight: 'var(--font-weight-bold)',
                color: 'var(--color-accent)',
                marginTop: 'var(--space-xs)',
              }}
            >
              {mostFrequent}
            </div>
          </div>
        )}
      </CardBody>
    </Card>
  );
});
