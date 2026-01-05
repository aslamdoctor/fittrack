import React from 'react';
import { IconButton } from '../ui/IconButton';
import { SetLog } from '../../types';
import { Check, Circle, Trash2 } from 'lucide-react';

interface SetRowProps {
  set: SetLog;
  setNumber: number;
  onToggleComplete: () => void;
  onDelete: () => void;
}

export function SetRow({ set, setNumber, onToggleComplete, onDelete }: SetRowProps) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--space-md)',
        padding: 'var(--space-md)',
        background: set.completed
          ? 'rgba(204, 255, 0, 0.1)'
          : 'var(--color-surface)',
        border: `2px solid ${set.completed ? 'var(--color-accent)' : 'var(--glass-border)'}`,
        borderRadius: 'var(--radius-md)',
        transition: 'all var(--transition-fast)',
        boxShadow: set.completed ? 'var(--glow-accent)' : 'none',
        animation: 'slideUp var(--transition-base)',
      }}
    >
      <button
        onClick={onToggleComplete}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '44px',
          height: '44px',
          borderRadius: 'var(--radius-full)',
          background: set.completed ? 'var(--color-accent)' : 'var(--color-surface)',
          border: `2px solid ${set.completed ? 'var(--color-accent)' : 'var(--glass-border)'}`,
          cursor: 'pointer',
          transition: 'all var(--transition-fast)',
        }}
        aria-label={set.completed ? 'Mark incomplete' : 'Mark complete'}
      >
        {set.completed ? (
          <Check size={24} color="var(--color-primary-dark)" />
        ) : (
          <Circle size={24} color="var(--color-text-muted)" />
        )}
      </button>

      <div style={{ flex: 1 }}>
        <div
          style={{
            fontSize: 'var(--font-size-sm)',
            color: 'var(--color-text-muted)',
            marginBottom: 'var(--space-xs)',
          }}
        >
          Set {setNumber}
        </div>
        <div
          style={{
            display: 'flex',
            gap: 'var(--space-lg)',
            fontSize: 'var(--font-size-lg)',
            fontWeight: 'var(--font-weight-bold)',
            color: set.completed ? 'var(--color-accent)' : 'var(--color-text-primary)',
          }}
        >
          <span>{set.weight} lbs</span>
          <span>×</span>
          <span>{set.reps} reps</span>
        </div>
      </div>

      <IconButton
        icon={<Trash2 size={18} />}
        variant="danger"
        size="sm"
        onClick={onDelete}
        aria-label="Delete set"
      />
    </div>
  );
}
