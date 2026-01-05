import React from 'react';

interface TimerDisplayProps {
  timeRemaining: number;
  totalTime: number;
  isRunning: boolean;
}

export function TimerDisplay({ timeRemaining, totalTime, isRunning }: TimerDisplayProps) {
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = totalTime > 0 ? (timeRemaining / totalTime) * 100 : 0;
  const circumference = 2 * Math.PI * 90; // radius = 90
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  const isAlmostDone = timeRemaining > 0 && timeRemaining <= 10;

  return (
    <div
      style={{
        position: 'relative',
        width: '200px',
        height: '200px',
        margin: '0 auto',
      }}
    >
      {/* SVG Circle Progress */}
      <svg
        width="200"
        height="200"
        style={{
          transform: 'rotate(-90deg)',
          position: 'absolute',
          top: 0,
          left: 0,
        }}
      >
        {/* Background circle */}
        <circle
          cx="100"
          cy="100"
          r="90"
          fill="none"
          stroke="var(--color-surface)"
          strokeWidth="12"
        />
        {/* Progress circle */}
        <circle
          cx="100"
          cy="100"
          r="90"
          fill="none"
          stroke={timeRemaining === 0 ? 'var(--color-success)' : 'var(--color-accent)'}
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          style={{
            transition: 'stroke-dashoffset 0.1s linear',
            filter: 'drop-shadow(0 0 10px currentColor)',
          }}
        />
      </svg>

      {/* Time Display */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            fontSize: 'var(--font-size-4xl)',
            fontWeight: 'var(--font-weight-black)',
            fontFamily: 'var(--font-family-display)',
            color: timeRemaining === 0 ? 'var(--color-success)' : 'var(--color-accent)',
            lineHeight: 1,
            marginBottom: 'var(--space-xs)',
            animation: isAlmostDone ? 'pulse 1s infinite' : 'none',
          }}
        >
          {formatTime(timeRemaining)}
        </div>
        <div
          style={{
            fontSize: 'var(--font-size-sm)',
            color: 'var(--color-text-muted)',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
          }}
        >
          {timeRemaining === 0 ? 'Complete!' : isRunning ? 'Rest Time' : 'Paused'}
        </div>
      </div>
    </div>
  );
}
