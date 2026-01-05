import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardBody } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { SetRow } from './SetRow';
import { SetLogger } from './SetLogger';
import { ExerciseSession } from '../../types';
import { Target } from 'lucide-react';

interface ExerciseTrackerProps {
  exercise: ExerciseSession;
  onLogSet: (weight: number, reps: number) => void;
  onToggleSetCompletion: (setId: string) => void;
  onDeleteSet: (setId: string) => void;
}

export function ExerciseTracker({
  exercise,
  onLogSet,
  onToggleSetCompletion,
  onDeleteSet,
}: ExerciseTrackerProps) {
  const completedSets = exercise.sets.filter((set) => set.completed).length;
  const progress = (completedSets / exercise.targetSets) * 100;
  const previousSet = exercise.sets.length > 0 ? exercise.sets[exercise.sets.length - 1] : undefined;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)' }}>
      {/* Exercise Header */}
      <Card glow>
        <CardHeader>
          <div style={{ flex: 1 }}>
            <CardTitle>{exercise.exerciseName}</CardTitle>
            <CardDescription>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)', marginTop: 'var(--space-xs)' }}>
                <Target size={16} />
                <span>
                  Target: {exercise.targetSets} sets × {exercise.targetReps} reps
                </span>
              </div>
            </CardDescription>
          </div>
          <Badge variant={completedSets >= exercise.targetSets ? 'success' : 'default'}>
            {completedSets} / {exercise.targetSets}
          </Badge>
        </CardHeader>

        {/* Progress Bar */}
        <CardBody>
          <div
            style={{
              width: '100%',
              height: '8px',
              background: 'var(--color-surface)',
              borderRadius: 'var(--radius-full)',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                width: `${progress}%`,
                height: '100%',
                background: completedSets >= exercise.targetSets
                  ? 'var(--color-success)'
                  : 'var(--color-accent)',
                borderRadius: 'var(--radius-full)',
                transition: 'width var(--transition-base)',
                boxShadow: '0 0 10px currentColor',
              }}
            />
          </div>
        </CardBody>
      </Card>

      {/* Set Logger */}
      {completedSets < exercise.targetSets && (
        <SetLogger
          setNumber={exercise.sets.length + 1}
          previousSet={previousSet}
          onLogSet={onLogSet}
        />
      )}

      {/* Completed Sets */}
      {exercise.sets.length > 0 && (
        <div>
          <div
            style={{
              fontSize: 'var(--font-size-sm)',
              fontWeight: 'var(--font-weight-semibold)',
              color: 'var(--color-text-primary)',
              marginBottom: 'var(--space-md)',
            }}
          >
            Completed Sets
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
            {exercise.sets.map((set, index) => (
              <SetRow
                key={set.id}
                set={set}
                setNumber={index + 1}
                onToggleComplete={() => onToggleSetCompletion(set.id)}
                onDelete={() => onDeleteSet(set.id)}
              />
            ))}
          </div>
        </div>
      )}

      {completedSets >= exercise.targetSets && (
        <Card>
          <CardBody>
            <div
              style={{
                textAlign: 'center',
                padding: 'var(--space-lg)',
                color: 'var(--color-success)',
                fontSize: 'var(--font-size-lg)',
                fontWeight: 'var(--font-weight-bold)',
              }}
            >
              ✓ Exercise Complete!
            </div>
          </CardBody>
        </Card>
      )}
    </div>
  );
}
