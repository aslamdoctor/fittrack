import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container } from '../layout/Container';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { ExerciseTracker } from './ExerciseTracker';
import { QuickAddExercise } from './QuickAddExercise';
import { WorkoutSummary } from './WorkoutSummary';
import { RestTimer } from '../timer/RestTimer';
import { useWorkoutContext } from '../../context/WorkoutContext';
import { useHistoryContext } from '../../context/HistoryContext';
import { Exercise } from '../../types';
import { ChevronLeft, ChevronRight, X, CheckCircle } from 'lucide-react';

export function WorkoutSession() {
  const navigate = useNavigate();
  const {
    activeWorkout,
    endWorkout,
    cancelWorkout,
    logSet,
    toggleSetCompletion,
    deleteSet,
    addExerciseToWorkout,
    currentExerciseIndex,
    setCurrentExerciseIndex,
  } = useWorkoutContext();
  const { addWorkoutToHistory } = useHistoryContext();
  const [showSummary, setShowSummary] = useState(false);
  const [showTimer, setShowTimer] = useState(false);

  if (!activeWorkout) {
    return null;
  }

  const currentExercise = activeWorkout.exercises[currentExerciseIndex];
  const canGoPrevious = currentExerciseIndex > 0;
  const canGoNext = currentExerciseIndex < activeWorkout.exercises.length - 1;

  const handlePrevious = () => {
    if (canGoPrevious) {
      setCurrentExerciseIndex(currentExerciseIndex - 1);
    }
  };

  const handleNext = () => {
    if (canGoNext) {
      setCurrentExerciseIndex(currentExerciseIndex + 1);
    }
  };

  const handleLogSet = (weight: number, reps: number) => {
    if (currentExercise) {
      logSet(currentExercise.exerciseId, weight, reps);
      // Trigger rest timer after logging a set
      setShowTimer(true);
    }
  };

  const handleToggleSetCompletion = (setId: string) => {
    if (currentExercise) {
      toggleSetCompletion(currentExercise.exerciseId, setId);
    }
  };

  const handleDeleteSet = (setId: string) => {
    if (currentExercise) {
      deleteSet(currentExercise.exerciseId, setId);
    }
  };

  const handleAddExercise = (exercise: Exercise) => {
    addExerciseToWorkout(exercise);
  };

  const handleFinishWorkout = () => {
    setShowSummary(true);
  };

  const handleSaveWorkout = () => {
    const completedWorkout = endWorkout();
    if (completedWorkout) {
      addWorkoutToHistory(completedWorkout);
    }
    navigate('/history');
  };

  const handleCancelWorkout = () => {
    cancelWorkout();
    navigate('/');
  };

  if (showSummary) {
    return (
      <Container>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <WorkoutSummary
            workout={activeWorkout}
            onSave={handleSaveWorkout}
            onCancel={() => setShowSummary(false)}
          />
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: 'var(--space-xl)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-md)' }}>
            <h1>{activeWorkout.routineName || 'Quick Workout'}</h1>
            <Button variant="danger" icon={<X size={20} />} onClick={handleCancelWorkout} size="sm">
              Cancel
            </Button>
          </div>

          {/* Progress */}
          <div style={{ display: 'flex', gap: 'var(--space-sm)', alignItems: 'center' }}>
            <Badge variant="success">
              Exercise {currentExerciseIndex + 1} of {activeWorkout.exercises.length}
            </Badge>
            <Badge>
              {new Date(activeWorkout.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </Badge>
          </div>
        </div>

        {/* Exercise Navigation */}
        {activeWorkout.exercises.length > 1 && (
          <div
            style={{
              display: 'flex',
              gap: 'var(--space-md)',
              marginBottom: 'var(--space-lg)',
            }}
          >
            <Button
              variant="secondary"
              icon={<ChevronLeft size={20} />}
              onClick={handlePrevious}
              disabled={!canGoPrevious}
              style={{ flex: 1 }}
            >
              Previous
            </Button>
            <Button
              variant="secondary"
              icon={<ChevronRight size={20} />}
              onClick={handleNext}
              disabled={!canGoNext}
              style={{ flex: 1 }}
            >
              Next
            </Button>
          </div>
        )}

        {/* Current Exercise Tracker */}
        {currentExercise && (
          <div style={{ marginBottom: 'var(--space-xl)' }}>
            <ExerciseTracker
              exercise={currentExercise}
              onLogSet={handleLogSet}
              onToggleSetCompletion={handleToggleSetCompletion}
              onDeleteSet={handleDeleteSet}
            />
          </div>
        )}

        {/* Rest Timer */}
        {showTimer && (
          <div style={{ marginBottom: 'var(--space-xl)' }}>
            <RestTimer
              autoStart={true}
              onComplete={() => setShowTimer(false)}
            />
          </div>
        )}

        {/* Quick Add Exercise */}
        <div style={{ marginBottom: 'var(--space-lg)' }}>
          <QuickAddExercise onAddExercise={handleAddExercise} />
        </div>

        {/* Finish Workout Button */}
        <Button
          icon={<CheckCircle size={20} />}
          onClick={handleFinishWorkout}
          size="lg"
          style={{ width: '100%' }}
        >
          Finish Workout
        </Button>
      </div>
    </Container>
  );
}
