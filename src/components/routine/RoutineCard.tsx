import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardBody, CardFooter } from '../ui/Card';
import { Button } from '../ui/Button';
import { IconButton } from '../ui/IconButton';
import { Badge } from '../ui/Badge';
import { Routine } from '../../types';
import { Play, Edit, Trash2, ChevronDown, ChevronUp } from 'lucide-react';

interface RoutineCardProps {
  routine: Routine;
  onEdit: (routine: Routine) => void;
  onDelete: (id: string) => void;
  onStart: (routine: Routine) => void;
}

export function RoutineCard({ routine, onEdit, onDelete, onStart }: RoutineCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <Card clickable glow={isExpanded} onClick={() => setIsExpanded(!isExpanded)}>
      <CardHeader>
        <div style={{ flex: 1 }}>
          <CardTitle>{routine.name}</CardTitle>
          {routine.description && <CardDescription>{routine.description}</CardDescription>}
        </div>
        {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </CardHeader>

      <CardBody>
        <div style={{ display: 'flex', gap: 'var(--space-sm)', marginBottom: 'var(--space-md)' }}>
          <Badge>{routine.exercises.length} exercises</Badge>
          <Badge variant="default">{formatDate(routine.createdAt)}</Badge>
        </div>

        {isExpanded && routine.exercises.length > 0 && (
          <div style={{ marginTop: 'var(--space-md)' }}>
            <div style={{ fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-semibold)', marginBottom: 'var(--space-sm)', color: 'var(--color-text-primary)' }}>
              Exercises:
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xs)' }}>
              {routine.exercises.map((exercise, index) => (
                <div
                  key={exercise.id}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: 'var(--space-sm)',
                    background: 'var(--color-surface)',
                    borderRadius: 'var(--radius-md)',
                    fontSize: 'var(--font-size-sm)',
                  }}
                >
                  <span style={{ color: 'var(--color-text-primary)' }}>
                    {index + 1}. {exercise.name}
                  </span>
                  <span style={{ color: 'var(--color-text-muted)' }}>
                    {exercise.defaultSets} × {exercise.defaultReps}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardBody>

      <CardFooter>
        <Button
          icon={<Play size={18} />}
          onClick={(e) => {
            e.stopPropagation();
            onStart(routine);
          }}
          size="sm"
        >
          Start Workout
        </Button>
        <IconButton
          icon={<Edit size={18} />}
          variant="default"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            onEdit(routine);
          }}
          aria-label="Edit routine"
        />
        <IconButton
          icon={<Trash2 size={18} />}
          variant="danger"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            onDelete(routine.id);
          }}
          aria-label="Delete routine"
        />
      </CardFooter>
    </Card>
  );
}
