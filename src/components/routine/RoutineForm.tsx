import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardBody, CardFooter } from '../ui/Card';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { IconButton } from '../ui/IconButton';
import { ExerciseSelector } from './ExerciseSelector';
import { Routine, Exercise } from '../../types';
import { Plus, Trash2, GripVertical } from 'lucide-react';

interface RoutineFormProps {
  routine?: Routine;
  onSave: (name: string, description: string, exercises: Omit<Exercise, 'id'>[]) => void;
  onCancel: () => void;
}

export function RoutineForm({ routine, onSave, onCancel }: RoutineFormProps) {
  const [name, setName] = useState(routine?.name || '');
  const [description, setDescription] = useState(routine?.description || '');
  const [exercises, setExercises] = useState<Omit<Exercise, 'id'>[]>(
    routine?.exercises.map(ex => ({
      name: ex.name,
      category: ex.category,
      defaultSets: ex.defaultSets,
      defaultReps: ex.defaultReps,
      notes: ex.notes,
    })) || []
  );
  const [showExerciseSelector, setShowExerciseSelector] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; exercises?: string }>({});

  const handleAddExercise = (exerciseName: string, category: string) => {
    const newExercise: Omit<Exercise, 'id'> = {
      name: exerciseName,
      category,
      defaultSets: 3,
      defaultReps: 10,
    };
    setExercises([...exercises, newExercise]);
  };

  const handleUpdateExercise = (index: number, field: string, value: any) => {
    const updated = [...exercises];
    updated[index] = { ...updated[index], [field]: value };
    setExercises(updated);
  };

  const handleRemoveExercise = (index: number) => {
    setExercises(exercises.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    const newErrors: { name?: string; exercises?: string } = {};

    if (!name.trim()) {
      newErrors.name = 'Routine name is required';
    }

    if (exercises.length === 0) {
      newErrors.exercises = 'Add at least one exercise';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSave(name.trim(), description.trim(), exercises);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>{routine ? 'Edit Routine' : 'Create New Routine'}</CardTitle>
        </CardHeader>

        <CardBody>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)' }}>
            <Input
              label="Routine Name"
              placeholder="e.g., Leg Day, Full Body"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setErrors({ ...errors, name: undefined });
              }}
              error={errors.name}
            />

            <Input
              label="Description (optional)"
              placeholder="Add a description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              multiline
            />

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-md)' }}>
                <label style={{ fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-text-primary)' }}>
                  Exercises
                </label>
                <Button
                  icon={<Plus size={18} />}
                  onClick={() => setShowExerciseSelector(true)}
                  size="sm"
                >
                  Add Exercise
                </Button>
              </div>

              {errors.exercises && (
                <div style={{ color: 'var(--color-error)', fontSize: 'var(--font-size-sm)', marginBottom: 'var(--space-sm)' }}>
                  {errors.exercises}
                </div>
              )}

              {exercises.length === 0 ? (
                <div
                  style={{
                    padding: 'var(--space-xl)',
                    textAlign: 'center',
                    color: 'var(--color-text-muted)',
                    background: 'var(--color-surface)',
                    borderRadius: 'var(--radius-md)',
                  }}
                >
                  No exercises added yet. Click "Add Exercise" to get started.
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
                  {exercises.map((exercise, index) => (
                    <div
                      key={index}
                      style={{
                        padding: 'var(--space-md)',
                        background: 'var(--color-surface)',
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid var(--glass-border)',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-md)', marginBottom: 'var(--space-md)' }}>
                        <GripVertical size={20} style={{ color: 'var(--color-text-muted)', marginTop: '2px' }} />
                        <div style={{ flex: 1 }}>
                          <div style={{ fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-text-primary)', marginBottom: 'var(--space-xs)' }}>
                            {exercise.name}
                          </div>
                          {exercise.category && (
                            <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)' }}>
                              {exercise.category}
                            </div>
                          )}
                        </div>
                        <IconButton
                          icon={<Trash2 size={18} />}
                          variant="danger"
                          size="sm"
                          onClick={() => handleRemoveExercise(index)}
                          aria-label="Remove exercise"
                        />
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-md)' }}>
                        <Input
                          label="Sets"
                          type="number"
                          min="1"
                          value={exercise.defaultSets}
                          onChange={(e) =>
                            handleUpdateExercise(index, 'defaultSets', parseInt(e.target.value) || 1)
                          }
                        />
                        <Input
                          label="Reps"
                          type="number"
                          min="1"
                          value={exercise.defaultReps}
                          onChange={(e) =>
                            handleUpdateExercise(index, 'defaultReps', parseInt(e.target.value) || 1)
                          }
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </CardBody>

        <CardFooter>
          <Button variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>
            {routine ? 'Save Changes' : 'Create Routine'}
          </Button>
        </CardFooter>
      </Card>

      <ExerciseSelector
        isOpen={showExerciseSelector}
        onClose={() => setShowExerciseSelector(false)}
        onSelectExercise={handleAddExercise}
      />
    </>
  );
}
