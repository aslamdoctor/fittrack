import { WorkoutHistoryCard } from './WorkoutHistoryCard';
import { WorkoutSession } from '../../types';

interface WorkoutHistoryListProps {
  workouts: WorkoutSession[];
  onDelete: (id: string) => void;
}

export function WorkoutHistoryList({ workouts, onDelete }: WorkoutHistoryListProps) {
  if (workouts.length === 0) {
    return (
      <div
        style={{
          textAlign: 'center',
          padding: 'var(--space-3xl)',
          color: 'var(--color-text-muted)',
        }}
      >
        <p>No workout history yet. Complete your first workout to see it here!</p>
      </div>
    );
  }

  return (
    <div className="stagger-container" style={{ display: 'grid', gap: 'var(--space-lg)' }}>
      {workouts.map((workout) => (
        <WorkoutHistoryCard key={workout.id} workout={workout} onDelete={onDelete} />
      ))}
    </div>
  );
}
