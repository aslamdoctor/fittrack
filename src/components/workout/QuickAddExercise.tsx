import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { ExerciseSelector } from '../routine/ExerciseSelector';
import { Exercise } from '../../types';
import { Plus } from 'lucide-react';
import { generateId } from '../../utils/generateId';

interface QuickAddExerciseProps {
  onAddExercise: (exercise: Exercise) => void;
}

export function QuickAddExercise({ onAddExercise }: QuickAddExerciseProps) {
  const [showSelector, setShowSelector] = useState(false);

  const handleSelectExercise = (name: string, category: string) => {
    const newExercise: Exercise = {
      id: generateId(),
      name,
      category,
      defaultSets: 3,
      defaultReps: 10,
    };
    onAddExercise(newExercise);
  };

  return (
    <>
      <Button
        icon={<Plus size={20} />}
        variant="ghost"
        onClick={() => setShowSelector(true)}
        size="lg"
        style={{ width: '100%' }}
      >
        Add Exercise to Workout
      </Button>

      <ExerciseSelector
        isOpen={showSelector}
        onClose={() => setShowSelector(false)}
        onSelectExercise={handleSelectExercise}
      />
    </>
  );
}
