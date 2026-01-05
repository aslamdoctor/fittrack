import React from 'react';

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  variant?: 'default' | 'accent' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  'aria-label': string; // Required for accessibility
}

export function IconButton({
  icon,
  variant = 'default',
  size = 'md',
  className = '',
  ...props
}: IconButtonProps) {
  const sizeStyles = {
    sm: { width: '32px', height: '32px', fontSize: '16px' },
    md: { width: '44px', height: '44px', fontSize: '20px' },
    lg: { width: '52px', height: '52px', fontSize: '24px' },
  };

  const variantStyles = {
    default: {
      backgroundColor: 'var(--color-surface)',
      color: 'var(--color-text-primary)',
    },
    accent: {
      backgroundColor: 'var(--color-accent)',
      color: 'var(--color-primary-dark)',
    },
    danger: {
      backgroundColor: 'var(--color-error)',
      color: 'white',
    },
  };

  const style = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: 'none',
    borderRadius: 'var(--radius-md)',
    cursor: 'pointer',
    transition: 'all var(--transition-fast)',
    ...sizeStyles[size],
    ...variantStyles[variant],
  };

  return (
    <button
      style={style}
      className={className}
      onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.8')}
      onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
      {...props}
    >
      {icon}
    </button>
  );
}
