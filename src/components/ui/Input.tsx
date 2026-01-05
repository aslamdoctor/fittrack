import React from 'react';
import '../../styles/components/input.css';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
  multiline?: boolean;
}

export function Input({
  label,
  error,
  hint,
  multiline,
  className = '',
  ...props
}: InputProps) {
  const classes = ['input', error && 'input--error', className].filter(Boolean).join(' ');

  const InputElement = multiline ? 'textarea' : 'input';

  return (
    <div className="input-group">
      {label && <label className="input-label">{label}</label>}
      <InputElement className={classes} {...(props as any)} />
      {error && <span className="input-error">{error}</span>}
      {hint && !error && <span className="input-hint">{hint}</span>}
    </div>
  );
}
