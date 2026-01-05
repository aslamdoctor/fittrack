import React from 'react';
import './PageTransition.css';

interface PageTransitionProps {
  children: React.ReactNode;
}

export function PageTransition({ children }: PageTransitionProps) {
  return <div className="page-transition">{children}</div>;
}
