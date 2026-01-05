import React from 'react';
import '../../styles/components/card.css';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  glow?: boolean;
  clickable?: boolean;
  children: React.ReactNode;
}

export const Card = React.memo(function Card({ glow, clickable, children, className = '', ...props }: CardProps) {
  const classes = [
    'card',
    glow && 'card--glow',
    clickable && 'card--clickable',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
});

interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export const CardHeader = React.memo(function CardHeader({ children, className = '' }: CardHeaderProps) {
  return <div className={`card__header ${className}`}>{children}</div>;
});

interface CardTitleProps {
  children: React.ReactNode;
  className?: string;
}

export const CardTitle = React.memo(function CardTitle({ children, className = '' }: CardTitleProps) {
  return <h3 className={`card__title ${className}`}>{children}</h3>;
});

interface CardDescriptionProps {
  children: React.ReactNode;
  className?: string;
}

export const CardDescription = React.memo(function CardDescription({ children, className = '' }: CardDescriptionProps) {
  return <p className={`card__description ${className}`}>{children}</p>;
});

interface CardBodyProps {
  children: React.ReactNode;
  className?: string;
}

export const CardBody = React.memo(function CardBody({ children, className = '' }: CardBodyProps) {
  return <div className={`card__body ${className}`}>{children}</div>;
});

interface CardFooterProps {
  children: React.ReactNode;
  className?: string;
}

export const CardFooter = React.memo(function CardFooter({ children, className = '' }: CardFooterProps) {
  return <div className={`card__footer ${className}`}>{children}</div>;
});
