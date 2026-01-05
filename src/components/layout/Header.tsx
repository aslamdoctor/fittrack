import React from 'react';
import { Dumbbell } from 'lucide-react';

export function Header() {
  return (
    <header
      style={{
        padding: 'var(--space-lg) var(--space-md)',
        borderBottom: '1px solid var(--glass-border)',
        background: 'var(--color-secondary-dark)',
      }}
    >
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--space-md)',
        }}
      >
        <Dumbbell size={32} color="var(--color-accent)" />
        <h1
          style={{
            fontFamily: 'var(--font-family-display)',
            fontSize: 'var(--font-size-2xl)',
            fontWeight: 'var(--font-weight-black)',
            color: 'var(--color-text-primary)',
            margin: 0,
          }}
        >
          FitTrack
        </h1>
      </div>
    </header>
  );
}
