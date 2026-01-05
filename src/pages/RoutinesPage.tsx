import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container } from '../components/layout/Container';
import { Button } from '../components/ui/Button';
import { RoutineList } from '../components/routine/RoutineList';
import { RoutineForm } from '../components/routine/RoutineForm';
import { useRoutineContext } from '../context/RoutineContext';
import { useWorkoutContext } from '../context/WorkoutContext';
import { Routine, Exercise } from '../types';
import { Plus, ArrowLeft } from 'lucide-react';

type ViewMode = 'list' | 'create' | 'edit';

export function RoutinesPage() {
  const navigate = useNavigate();
  const { routines, createRoutine, updateRoutine, deleteRoutine } = useRoutineContext();
  const { startWorkout } = useWorkoutContext();
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [editingRoutine, setEditingRoutine] = useState<Routine | undefined>(undefined);

  const handleCreateRoutine = (
    name: string,
    description: string,
    exercises: Omit<Exercise, 'id'>[]
  ) => {
    const routine = createRoutine(name, description);
    // Update the routine with exercises
    updateRoutine(routine.id, {
      exercises: exercises.map((ex, index) => ({
        id: `${routine.id}-ex-${index}`,
        ...ex,
      })),
    });
    setViewMode('list');
  };

  const handleUpdateRoutine = (
    name: string,
    description: string,
    exercises: Omit<Exercise, 'id'>[]
  ) => {
    if (!editingRoutine) return;

    updateRoutine(editingRoutine.id, {
      name,
      description,
      exercises: exercises.map((ex, index) => ({
        id: `${editingRoutine.id}-ex-${index}`,
        ...ex,
      })),
    });
    setViewMode('list');
    setEditingRoutine(undefined);
  };

  const handleEdit = (routine: Routine) => {
    setEditingRoutine(routine);
    setViewMode('edit');
  };

  const handleDelete = (id: string) => {
    deleteRoutine(id);
  };

  const handleStartWorkout = (routine: Routine) => {
    startWorkout(routine.id, routine.name, routine.exercises);
    navigate('/workout');
  };

  const handleCancel = () => {
    setViewMode('list');
    setEditingRoutine(undefined);
  };

  return (
    <Container>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        {viewMode === 'list' ? (
          <>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 'var(--space-xl)',
              }}
            >
              <h1>My Routines</h1>
              <Button icon={<Plus size={20} />} onClick={() => setViewMode('create')}>
                Create Routine
              </Button>
            </div>

            <RoutineList
              routines={routines}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onStart={handleStartWorkout}
            />
          </>
        ) : (
          <>
            <div style={{ marginBottom: 'var(--space-xl)' }}>
              <Button
                variant="ghost"
                icon={<ArrowLeft size={20} />}
                onClick={handleCancel}
                size="sm"
              >
                Back to Routines
              </Button>
            </div>

            <RoutineForm
              routine={viewMode === 'edit' ? editingRoutine : undefined}
              onSave={viewMode === 'edit' ? handleUpdateRoutine : handleCreateRoutine}
              onCancel={handleCancel}
            />
          </>
        )}
      </div>
    </Container>
  );
}
