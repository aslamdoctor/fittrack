import { RoutineCard } from './RoutineCard';
import { Routine } from '../../types';

interface RoutineListProps {
  routines: Routine[];
  onEdit: (routine: Routine) => void;
  onDelete: (id: string) => void;
  onStart: (routine: Routine) => void;
}

export function RoutineList({ routines, onEdit, onDelete, onStart }: RoutineListProps) {
  if (routines.length === 0) {
    return (
      <div
        style={{
          textAlign: 'center',
          padding: 'var(--space-3xl)',
          color: 'var(--color-text-muted)',
        }}
      >
        <p>No routines yet. Create your first workout routine to get started!</p>
      </div>
    );
  }

  return (
    <div
      className="stagger-container"
      style={{
        display: 'grid',
        gap: 'var(--space-lg)',
      }}
    >
      {routines.map((routine) => (
        <RoutineCard
          key={routine.id}
          routine={routine}
          onEdit={onEdit}
          onDelete={onDelete}
          onStart={onStart}
        />
      ))}
    </div>
  );
}
