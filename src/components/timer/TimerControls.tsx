import React from 'react';
import { Button } from '../ui/Button';
import { IconButton } from '../ui/IconButton';
import { Play, Pause, RotateCcw, SkipForward, Plus, Minus } from 'lucide-react';

interface TimerControlsProps {
  isRunning: boolean;
  timeRemaining: number;
  onStart: () => void;
  onPause: () => void;
  onResume: () => void;
  onReset: () => void;
  onSkip: () => void;
  onAdjust: (seconds: number) => void;
}

export function TimerControls({
  isRunning,
  timeRemaining,
  onStart,
  onPause,
  onResume,
  onReset,
  onSkip,
  onAdjust,
}: TimerControlsProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
      {/* Main Controls */}
      <div
        style={{
          display: 'flex',
          gap: 'var(--space-md)',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <IconButton
          icon={<RotateCcw size={20} />}
          onClick={onReset}
          variant="default"
          size="md"
          aria-label="Reset timer"
        />

        {!isRunning && timeRemaining > 0 ? (
          <Button
            icon={<Play size={24} />}
            onClick={onResume}
            size="lg"
            style={{ minWidth: '120px' }}
          >
            Resume
          </Button>
        ) : isRunning ? (
          <Button
            icon={<Pause size={24} />}
            onClick={onPause}
            variant="ghost"
            size="lg"
            style={{ minWidth: '120px' }}
          >
            Pause
          </Button>
        ) : (
          <Button
            icon={<Play size={24} />}
            onClick={onStart}
            size="lg"
            style={{ minWidth: '120px' }}
          >
            Start
          </Button>
        )}

        <IconButton
          icon={<SkipForward size={20} />}
          onClick={onSkip}
          variant="default"
          size="md"
          aria-label="Skip timer"
        />
      </div>

      {/* Quick Adjust Buttons */}
      {!isRunning && (
        <div
          style={{
            display: 'flex',
            gap: 'var(--space-sm)',
            justifyContent: 'center',
          }}
        >
          <Button
            variant="secondary"
            icon={<Minus size={16} />}
            onClick={() => onAdjust(-30)}
            size="sm"
          >
            -30s
          </Button>
          <Button
            variant="secondary"
            icon={<Plus size={16} />}
            onClick={() => onAdjust(30)}
            size="sm"
          >
            +30s
          </Button>
        </div>
      )}
    </div>
  );
}
