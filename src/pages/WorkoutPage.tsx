import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container } from '../components/layout/Container';
import { Card, CardHeader, CardTitle, CardBody } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import { WorkoutSession } from '../components/workout/WorkoutSession';
import { useWorkoutContext } from '../context/WorkoutContext';
import { useRoutineContext } from '../context/RoutineContext';
import { Routine } from '../types';
import { Play, Zap } from 'lucide-react';

export function WorkoutPage() {
  const navigate = useNavigate();
  const { activeWorkout, startWorkout } = useWorkoutContext();
  const { routines } = useRoutineContext();
  const [showRoutineSelector, setShowRoutineSelector] = useState(false);

  // If there's an active workout, show the workout session
  if (activeWorkout) {
    return <WorkoutSession />;
  }

  const handleStartQuickWorkout = () => {
    startWorkout();
    // The activeWorkout will be set, triggering a re-render that shows WorkoutSession
  };

  const handleSelectRoutine = (routine: Routine) => {
    startWorkout(routine.id, routine.name, routine.exercises);
    setShowRoutineSelector(false);
  };

  return (
    <>
      <Container>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h1 style={{ marginBottom: 'var(--space-xl)' }}>Start Workout</h1>

          <div style={{ display: 'grid', gap: 'var(--space-lg)' }}>
            {/* Quick Workout */}
            <Card glow>
              <CardHeader>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)' }}>
                  <div
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: 'var(--radius-md)',
                      background: 'var(--color-accent)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Zap size={28} color="var(--color-primary-dark)" />
                  </div>
                  <div style={{ flex: 1 }}>
                    <CardTitle>Quick Workout</CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardBody>
                <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--space-lg)' }}>
                  Start a blank workout and add exercises as you go.
                </p>
                <Button icon={<Play size={20} />} onClick={handleStartQuickWorkout} size="lg">
                  Start Now
                </Button>
              </CardBody>
            </Card>

            {/* Select Routine */}
            <Card>
              <CardHeader>
                <CardTitle>Select a Routine</CardTitle>
              </CardHeader>
              <CardBody>
                {routines.length > 0 ? (
                  <>
                    <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--space-lg)' }}>
                      Choose from your saved workout routines.
                    </p>
                    <Button
                      icon={<Play size={20} />}
                      variant="ghost"
                      onClick={() => setShowRoutineSelector(true)}
                      size="lg"
                    >
                      Browse Routines
                    </Button>
                  </>
                ) : (
                  <>
                    <p style={{ color: 'var(--color-text-muted)', marginBottom: 'var(--space-lg)' }}>
                      No routines yet. Create your first routine to get started!
                    </p>
                    <Button
                      variant="ghost"
                      onClick={() => navigate('/routines')}
                      size="lg"
                    >
                      Create Routine
                    </Button>
                  </>
                )}
              </CardBody>
            </Card>
          </div>
        </div>
      </Container>

      {/* Routine Selector Modal */}
      <Modal
        isOpen={showRoutineSelector}
        onClose={() => setShowRoutineSelector(false)}
        title="Select Routine"
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
          {routines.map((routine) => (
            <div
              key={routine.id}
              onClick={() => handleSelectRoutine(routine)}
              style={{
                padding: 'var(--space-md)',
                background: 'var(--color-surface)',
                borderRadius: 'var(--radius-md)',
                cursor: 'pointer',
                transition: 'all var(--transition-fast)',
                border: '1px solid var(--glass-border)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'var(--color-surface-hover)';
                e.currentTarget.style.borderColor = 'var(--color-accent)';
                e.currentTarget.style.transform = 'translateX(4px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'var(--color-surface)';
                e.currentTarget.style.borderColor = 'var(--glass-border)';
                e.currentTarget.style.transform = 'translateX(0)';
              }}
            >
              <div style={{ fontWeight: 'var(--font-weight-bold)', color: 'var(--color-text-primary)', marginBottom: 'var(--space-xs)' }}>
                {routine.name}
              </div>
              <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)' }}>
                {routine.exercises.length} exercises
              </div>
            </div>
          ))}
        </div>
      </Modal>
    </>
  );
}
