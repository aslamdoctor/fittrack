import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardBody, CardFooter } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { IconButton } from '../ui/IconButton';
import { WorkoutSession } from '../../types';
import { calculateTotalVolume, calculateWorkoutDuration } from '../../utils/calculations';
import { formatRelativeTime, formatDate, formatTime } from '../../utils/dateFormat';
import { ChevronDown, ChevronUp, Trash2, Clock, TrendingUp } from 'lucide-react';

interface WorkoutHistoryCardProps {
  workout: WorkoutSession;
  onDelete: (id: string) => void;
}

export function WorkoutHistoryCard({ workout, onDelete }: WorkoutHistoryCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const totalVolume = calculateTotalVolume(workout);
  const duration = calculateWorkoutDuration(workout);
  const totalSets = workout.exercises.reduce(
    (sum, ex) => sum + ex.sets.filter((s) => s.completed).length,
    0
  );

  return (
    <Card clickable onClick={() => setIsExpanded(!isExpanded)}>
      <CardHeader>
        <div style={{ flex: 1 }}>
          <CardTitle>{workout.routineName || 'Quick Workout'}</CardTitle>
          <CardDescription>
            {formatRelativeTime(workout.startTime)} • {formatDate(workout.startTime)} at{' '}
            {formatTime(workout.startTime)}
          </CardDescription>
        </div>
        {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </CardHeader>

      <CardBody>
        <div style={{ display: 'flex', gap: 'var(--space-sm)', flexWrap: 'wrap' }}>
          <Badge>
            <Clock size={14} style={{ marginRight: 'var(--space-xs)' }} />
            {duration} min
          </Badge>
          <Badge>{totalSets} sets</Badge>
          <Badge>
            <TrendingUp size={14} style={{ marginRight: 'var(--space-xs)' }} />
            {totalVolume.toLocaleString()} lbs
          </Badge>
        </div>

        {isExpanded && (
          <div style={{ marginTop: 'var(--space-lg)' }}>
            <div
              style={{
                fontSize: 'var(--font-size-sm)',
                fontWeight: 'var(--font-weight-semibold)',
                marginBottom: 'var(--space-sm)',
                color: 'var(--color-text-primary)',
              }}
            >
              Exercises:
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xs)' }}>
              {workout.exercises.map((exercise, index) => {
                const completedSets = exercise.sets.filter((s) => s.completed).length;
                const exerciseVolume = exercise.sets
                  .filter((s) => s.completed)
                  .reduce((sum, s) => sum + s.weight * s.reps, 0);

                return (
                  <div
                    key={index}
                    style={{
                      padding: 'var(--space-sm)',
                      background: 'var(--color-surface)',
                      borderRadius: 'var(--radius-md)',
                      fontSize: 'var(--font-size-sm)',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginBottom: 'var(--space-xs)',
                      }}
                    >
                      <span style={{ color: 'var(--color-text-primary)', fontWeight: 'var(--font-weight-semibold)' }}>
                        {exercise.exerciseName}
                      </span>
                      <span style={{ color: 'var(--color-text-muted)' }}>
                        {completedSets} sets • {exerciseVolume.toLocaleString()} lbs
                      </span>
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        gap: 'var(--space-xs)',
                        flexWrap: 'wrap',
                      }}
                    >
                      {exercise.sets
                        .filter((s) => s.completed)
                        .map((set, setIndex) => (
                          <span
                            key={setIndex}
                            style={{
                              fontSize: 'var(--font-size-xs)',
                              color: 'var(--color-text-muted)',
                            }}
                          >
                            {set.weight}×{set.reps}
                          </span>
                        ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </CardBody>

      {isExpanded && (
        <CardFooter>
          <IconButton
            icon={<Trash2 size={18} />}
            variant="danger"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(workout.id);
            }}
            aria-label="Delete workout"
          />
        </CardFooter>
      )}
    </Card>
  );
}
