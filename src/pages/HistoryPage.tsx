import React from 'react';
import { Container } from '../components/layout/Container';
import { WorkoutHistoryList } from '../components/history/WorkoutHistoryList';
import { DataManagement } from '../components/history/DataManagement';
import { useHistoryContext } from '../context/HistoryContext';

export function HistoryPage() {
  const { workoutHistory, deleteWorkout } = useHistoryContext();

  return (
    <Container>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ marginBottom: 'var(--space-xl)' }}>Workout History</h1>

        <div style={{ display: 'grid', gap: 'var(--space-2xl)' }}>
          <WorkoutHistoryList workouts={workoutHistory} onDelete={deleteWorkout} />

          {workoutHistory.length > 0 && <DataManagement />}
        </div>
      </div>
    </Container>
  );
}
