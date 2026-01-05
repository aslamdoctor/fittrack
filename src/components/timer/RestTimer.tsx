import React, { useEffect } from 'react';
import { Card, CardBody } from '../ui/Card';
import { TimerDisplay } from './TimerDisplay';
import { TimerControls } from './TimerControls';
import { useRestTimer } from '../../hooks/useRestTimer';
import { useNotification } from '../../hooks/useNotification';
import { useAppContext } from '../../context/AppContext';

interface RestTimerProps {
  autoStart?: boolean;
  onComplete?: () => void;
}

export function RestTimer({ autoStart = false, onComplete }: RestTimerProps) {
  const { settings } = useAppContext();
  const { showNotification, requestPermission, permission } = useNotification();

  const handleTimerComplete = () => {
    // Show notification
    if (settings.soundEnabled && permission === 'granted') {
      showNotification('Rest Complete', "Time to crush your next set!");
    }
    onComplete?.();
  };

  const { timeRemaining, isRunning, start, pause, resume, reset, skip } = useRestTimer(
    settings.defaultRestTime,
    handleTimerComplete
  );

  // Request notification permission on mount
  useEffect(() => {
    if (settings.soundEnabled && permission === 'default') {
      requestPermission();
    }
  }, [settings.soundEnabled, permission, requestPermission]);

  // Auto-start if enabled
  useEffect(() => {
    if (autoStart && settings.autoStartTimer) {
      start();
    }
  }, [autoStart, settings.autoStartTimer, start]);

  const handleAdjust = (seconds: number) => {
    const newTime = Math.max(0, timeRemaining + seconds);
    if (newTime > 0) {
      start(newTime);
    }
  };

  return (
    <Card>
      <CardBody>
        <div style={{ padding: 'var(--space-lg)' }}>
          <TimerDisplay
            timeRemaining={timeRemaining}
            totalTime={settings.defaultRestTime}
            isRunning={isRunning}
          />

          <div style={{ marginTop: 'var(--space-xl)' }}>
            <TimerControls
              isRunning={isRunning}
              timeRemaining={timeRemaining}
              onStart={() => start()}
              onPause={pause}
              onResume={resume}
              onReset={reset}
              onSkip={skip}
              onAdjust={handleAdjust}
            />
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
