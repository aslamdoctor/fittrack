import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Dumbbell, Activity, History } from 'lucide-react';

export function BottomNav() {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/routines', label: 'Routines', icon: Dumbbell },
    { path: '/workout', label: 'Workout', icon: Activity },
    { path: '/history', label: 'History', icon: History },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav
      aria-label="Primary navigation"
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        background: 'var(--color-secondary-dark)',
        borderTop: '1px solid var(--glass-border)',
        padding: 'var(--space-sm) var(--space-md)',
        zIndex: 'var(--z-dropdown)',
      }}
    >
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 'var(--space-sm)',
        }}
      >
        {navItems.map(({ path, label, icon: Icon }) => (
          <Link
            key={path}
            to={path}
            aria-current={isActive(path) ? 'page' : undefined}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 'var(--space-xs)',
              padding: 'var(--space-sm)',
              borderRadius: 'var(--radius-md)',
              color: isActive(path) ? 'var(--color-accent)' : 'var(--color-text-secondary)',
              background: isActive(path) ? 'rgba(204, 255, 0, 0.1)' : 'transparent',
              transition: 'all var(--transition-fast)',
              textDecoration: 'none',
              minHeight: '44px',
            }}
          >
            <Icon size={24} />
            <span
              style={{
                fontSize: 'var(--font-size-xs)',
                fontWeight: 'var(--font-weight-semibold)',
              }}
            >
              {label}
            </span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
