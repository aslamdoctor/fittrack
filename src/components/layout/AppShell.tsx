import React from 'react';
import { Header } from './Header';
import { BottomNav } from './BottomNav';

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        background: 'var(--color-primary-dark)',
      }}
    >
      <a
        href="#main-content"
        className="visually-hidden"
        style={{
          position: 'absolute',
          top: '-100px',
          left: 0,
          background: 'var(--color-accent)',
          color: 'var(--color-primary-dark)',
          padding: 'var(--space-md) var(--space-lg)',
          textDecoration: 'none',
          fontWeight: 'var(--font-weight-bold)',
          zIndex: 1000,
          borderRadius: 'var(--radius-md)',
        }}
        onFocus={(e) => {
          e.currentTarget.style.top = 'var(--space-md)';
          e.currentTarget.style.left = 'var(--space-md)';
        }}
        onBlur={(e) => {
          e.currentTarget.style.top = '-100px';
          e.currentTarget.style.left = '0';
        }}
      >
        Skip to main content
      </a>
      <Header />
      <main
        id="main-content"
        style={{
          flex: 1,
          paddingBottom: '80px', // Space for bottom nav
          paddingTop: 'var(--space-lg)',
        }}
      >
        {children}
      </main>
      <BottomNav />
    </div>
  );
}
