import { useNavigate } from 'react-router-dom';
import { Container } from '../components/layout/Container';
import { Card, CardHeader, CardTitle, CardBody } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { StatsOverview } from '../components/history/StatsOverview';
import { WorkoutHistoryCard } from '../components/history/WorkoutHistoryCard';
import { useHistoryContext } from '../context/HistoryContext';
import { Play, ListChecks } from 'lucide-react';

export function HomePage() {
  const navigate = useNavigate();
  const { workoutHistory, getRecentWorkouts, deleteWorkout } = useHistoryContext();
  const recentWorkouts = getRecentWorkouts(3);

  return (
    <Container>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ marginBottom: 'var(--space-2xl)' }}>
          <h1 style={{ marginBottom: 'var(--space-sm)' }}>Welcome to FitTrack</h1>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-lg)' }}>
            Your premium workout tracking companion
          </p>
        </div>

        <div style={{ display: 'grid', gap: 'var(--space-lg)', marginBottom: 'var(--space-2xl)' }}>
          {/* Quick Actions */}
          <Card glow>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardBody>
              <div style={{ display: 'flex', gap: 'var(--space-md)', flexWrap: 'wrap' }}>
                <Button
                  icon={<Play size={20} />}
                  size="lg"
                  onClick={() => navigate('/workout')}
                >
                  Start Workout
                </Button>
                <Button
                  variant="ghost"
                  icon={<ListChecks size={20} />}
                  size="lg"
                  onClick={() => navigate('/routines')}
                >
                  Browse Routines
                </Button>
              </div>
            </CardBody>
          </Card>

          {/* Stats Overview */}
          <StatsOverview workoutHistory={workoutHistory} />

          {/* Recent Workouts */}
          <Card>
            <CardHeader>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flex: 1 }}>
                <CardTitle>Recent Workouts</CardTitle>
                {recentWorkouts.length > 0 && (
                  <Button
                    variant="ghost"
                    onClick={() => navigate('/history')}
                    size="sm"
                  >
                    View All
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardBody>
              {recentWorkouts.length === 0 ? (
                <div
                  style={{
                    textAlign: 'center',
                    padding: 'var(--space-xl)',
                    color: 'var(--color-text-muted)',
                  }}
                >
                  <p>No workouts yet. Start your first workout to see it here!</p>
                </div>
              ) : (
                <div className="stagger-container" style={{ display: 'grid', gap: 'var(--space-md)' }}>
                  {recentWorkouts.map((workout) => (
                    <WorkoutHistoryCard
                      key={workout.id}
                      workout={workout}
                      onDelete={deleteWorkout}
                    />
                  ))}
                </div>
              )}
            </CardBody>
          </Card>
        </div>
      </div>
    </Container>
  );
}
