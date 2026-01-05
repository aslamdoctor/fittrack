import React, { useState, useMemo } from 'react';
import { Modal } from '../ui/Modal';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { EXERCISE_LIBRARY } from '../../data/exerciseLibrary';
import { Plus } from 'lucide-react';

interface ExerciseSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectExercise: (name: string, category: string) => void;
}

export function ExerciseSelector({ isOpen, onClose, onSelectExercise }: ExerciseSelectorProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [customExerciseName, setCustomExerciseName] = useState('');
  const [customExerciseCategory, setCustomExerciseCategory] = useState('');
  const [showCustomForm, setShowCustomForm] = useState(false);

  // Get unique categories
  const categories = useMemo(() => {
    const cats = new Set(EXERCISE_LIBRARY.map((ex) => ex.category));
    return ['All', ...Array.from(cats)];
  }, []);

  // Filter exercises
  const filteredExercises = useMemo(() => {
    return EXERCISE_LIBRARY.filter((exercise) => {
      const matchesSearch = exercise.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === 'All' || exercise.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  const handleSelectExercise = (name: string, category: string) => {
    onSelectExercise(name, category);
    setSearchTerm('');
    setSelectedCategory('All');
    onClose();
  };

  const handleCreateCustomExercise = () => {
    if (customExerciseName.trim()) {
      onSelectExercise(customExerciseName.trim(), customExerciseCategory.trim() || 'Custom');
      setCustomExerciseName('');
      setCustomExerciseCategory('');
      setShowCustomForm(false);
      onClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Select Exercise"
      footer={
        !showCustomForm ? (
          <Button variant="ghost" onClick={() => setShowCustomForm(true)}>
            Create Custom Exercise
          </Button>
        ) : (
          <>
            <Button variant="secondary" onClick={() => setShowCustomForm(false)}>
              Back to Library
            </Button>
            <Button onClick={handleCreateCustomExercise} disabled={!customExerciseName.trim()}>
              Add Custom Exercise
            </Button>
          </>
        )
      }
    >
      {!showCustomForm ? (
        <>
          <Input
            placeholder="Search exercises..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ marginBottom: 'var(--space-md)' }}
          />

          <div style={{ display: 'flex', gap: 'var(--space-xs)', marginBottom: 'var(--space-lg)', flexWrap: 'wrap' }}>
            {categories.map((category) => (
              <Badge
                key={category}
                variant={selectedCategory === category ? 'success' : 'default'}
                style={{ cursor: 'pointer' }}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Badge>
            ))}
          </div>

          <div
            style={{
              maxHeight: '400px',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-sm)',
            }}
          >
            {filteredExercises.map((exercise, index) => (
              <div
                key={index}
                onClick={() => handleSelectExercise(exercise.name, exercise.category)}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: 'var(--space-md)',
                  background: 'var(--color-surface)',
                  borderRadius: 'var(--radius-md)',
                  cursor: 'pointer',
                  transition: 'all var(--transition-fast)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'var(--color-surface-hover)';
                  e.currentTarget.style.transform = 'translateX(4px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'var(--color-surface)';
                  e.currentTarget.style.transform = 'translateX(0)';
                }}
              >
                <span style={{ fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-text-primary)' }}>
                  {exercise.name}
                </span>
                <Badge>{exercise.category}</Badge>
              </div>
            ))}

            {filteredExercises.length === 0 && (
              <div style={{ textAlign: 'center', padding: 'var(--space-xl)', color: 'var(--color-text-muted)' }}>
                No exercises found. Try a different search or create a custom exercise.
              </div>
            )}
          </div>
        </>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
          <Input
            label="Exercise Name"
            placeholder="e.g., Barbell Squat"
            value={customExerciseName}
            onChange={(e) => setCustomExerciseName(e.target.value)}
          />
          <Input
            label="Category (optional)"
            placeholder="e.g., Legs"
            value={customExerciseCategory}
            onChange={(e) => setCustomExerciseCategory(e.target.value)}
          />
        </div>
      )}
    </Modal>
  );
}
