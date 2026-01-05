import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'error';
  className?: string;
}

export function Badge({ children, variant = 'default', className = '' }: BadgeProps) {
  const variantStyles = {
    default: {
      backgroundColor: 'var(--color-surface)',
      color: 'var(--color-text-primary)',
    },
    success: {
      backgroundColor: 'rgba(0, 255, 136, 0.2)',
      color: 'var(--color-success)',
    },
    warning: {
      backgroundColor: 'rgba(255, 184, 0, 0.2)',
      color: 'var(--color-warning)',
    },
    error: {
      backgroundColor: 'rgba(255, 51, 102, 0.2)',
      color: 'var(--color-error)',
    },
  };

  const style = {
    display: 'inline-flex',
    alignItems: 'center',
    padding: 'var(--space-xs) var(--space-sm)',
    fontSize: 'var(--font-size-xs)',
    fontWeight: 'var(--font-weight-semibold)',
    borderRadius: 'var(--radius-full)',
    ...variantStyles[variant],
  };

  return (
    <span style={style} className={className}>
      {children}
    </span>
  );
}
