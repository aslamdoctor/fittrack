import React from 'react';
import { Card, CardHeader, CardTitle, CardBody, CardFooter } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { WorkoutSession } from '../../types';
import { Clock, Dumbbell, TrendingUp } from 'lucide-react';

interface WorkoutSummaryProps {
  workout: WorkoutSession;
  onSave: () => void;
  onCancel: () => void;
}

export function WorkoutSummary({ workout, onSave, onCancel }: WorkoutSummaryProps) {
  const calculateDuration = () => {
    const start = new Date(workout.startTime);
    const end = new Date();
    const durationMs = end.getTime() - start.getTime();
    const minutes = Math.floor(durationMs / 60000);
    return minutes;
  };

  const calculateTotalVolume = () => {
    let totalVolume = 0;
    workout.exercises.forEach((exercise) => {
      exercise.sets.forEach((set) => {
        if (set.completed) {
          totalVolume += set.weight * set.reps;
        }
      });
    });
    return totalVolume;
  };

  const calculateTotalSets = () => {
    let totalSets = 0;
    workout.exercises.forEach((exercise) => {
      totalSets += exercise.sets.filter((set) => set.completed).length;
    });
    return totalSets;
  };

  const duration = calculateDuration();
  const totalVolume = calculateTotalVolume();
  const totalSets = calculateTotalSets();

  return (
    <Card glow>
      <CardHeader>
        <CardTitle>Workout Complete!</CardTitle>
      </CardHeader>

      <CardBody>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)' }}>
          {/* Stats Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 'var(--space-md)',
            }}
          >
            <div
              style={{
                padding: 'var(--space-md)',
                background: 'var(--color-surface)',
                borderRadius: 'var(--radius-md)',
                textAlign: 'center',
              }}
            >
              <Clock size={24} style={{ color: 'var(--color-accent)', marginBottom: 'var(--space-xs)' }} />
              <div style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 'var(--font-weight-bold)', color: 'var(--color-accent)' }}>
                {duration}
              </div>
              <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>
                Minutes
              </div>
            </div>

            <div
              style={{
                padding: 'var(--space-md)',
                background: 'var(--color-surface)',
                borderRadius: 'var(--radius-md)',
                textAlign: 'center',
              }}
            >
              <Dumbbell size={24} style={{ color: 'var(--color-accent)', marginBottom: 'var(--space-xs)' }} />
              <div style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 'var(--font-weight-bold)', color: 'var(--color-accent)' }}>
                {totalSets}
              </div>
              <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>
                Sets
              </div>
            </div>

            <div
              style={{
                padding: 'var(--space-md)',
                background: 'var(--color-surface)',
                borderRadius: 'var(--radius-md)',
                textAlign: 'center',
              }}
            >
              <TrendingUp size={24} style={{ color: 'var(--color-accent)', marginBottom: 'var(--space-xs)' }} />
              <div style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 'var(--font-weight-bold)', color: 'var(--color-accent)' }}>
                {totalVolume.toLocaleString()}
              </div>
              <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>
                Total Volume
              </div>
            </div>
          </div>

          {/* Exercise Summary */}
          <div>
            <div
              style={{
                fontSize: 'var(--font-size-sm)',
                fontWeight: 'var(--font-weight-semibold)',
                color: 'var(--color-text-primary)',
                marginBottom: 'var(--space-md)',
              }}
            >
              Exercises Completed
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
              {workout.exercises.map((exercise) => {
                const completedSets = exercise.sets.filter((set) => set.completed).length;
                return (
                  <div
                    key={exercise.exerciseId}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: 'var(--space-sm)',
                      background: 'var(--color-surface)',
                      borderRadius: 'var(--radius-md)',
                    }}
                  >
                    <span style={{ color: 'var(--color-text-primary)' }}>{exercise.exerciseName}</span>
                    <Badge variant={completedSets > 0 ? 'success' : 'default'}>
                      {completedSets} sets
                    </Badge>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </CardBody>

      <CardFooter>
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={onSave}>Save & Finish</Button>
      </CardFooter>
    </Card>
  );
}
