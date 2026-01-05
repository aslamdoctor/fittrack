interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function LoadingSpinner({ size = 'md', className = '' }: LoadingSpinnerProps) {
  const sizeMap = {
    sm: 16,
    md: 24,
    lg: 32,
  };

  const spinnerSize = sizeMap[size];

  const style = {
    width: `${spinnerSize}px`,
    height: `${spinnerSize}px`,
    border: `2px solid var(--color-surface)`,
    borderTop: `2px solid var(--color-accent)`,
    borderRadius: '50%',
    animation: 'spin 0.8s linear infinite',
  };

  return (
    <>
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
      <div style={style} className={className} aria-label="Loading" />
    </>
  );
}
