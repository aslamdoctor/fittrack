import { Component, ErrorInfo, ReactNode } from 'react';
import { Button } from './ui/Button';
import { AlertTriangle } from 'lucide-react';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'var(--color-primary-dark)',
            padding: 'var(--space-lg)',
          }}
        >
          <div
            style={{
              maxWidth: '600px',
              padding: 'var(--space-2xl)',
              background: 'var(--color-secondary-dark)',
              border: '1px solid var(--glass-border)',
              borderRadius: 'var(--radius-xl)',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                width: '80px',
                height: '80px',
                margin: '0 auto var(--space-xl)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(255, 51, 102, 0.1)',
                borderRadius: '50%',
              }}
            >
              <AlertTriangle size={40} style={{ color: 'var(--color-error)' }} />
            </div>

            <h1
              style={{
                fontSize: 'var(--font-size-3xl)',
                fontWeight: 'var(--font-weight-bold)',
                marginBottom: 'var(--space-md)',
                color: 'var(--color-text-primary)',
              }}
            >
              Oops! Something went wrong
            </h1>

            <p
              style={{
                fontSize: 'var(--font-size-lg)',
                color: 'var(--color-text-secondary)',
                marginBottom: 'var(--space-2xl)',
                lineHeight: 1.6,
              }}
            >
              We encountered an unexpected error. Don't worry, your data is safe. Try refreshing the page or returning to the home screen.
            </p>

            {this.state.error && (
              <details
                style={{
                  marginBottom: 'var(--space-2xl)',
                  padding: 'var(--space-md)',
                  background: 'var(--color-surface)',
                  borderRadius: 'var(--radius-md)',
                  textAlign: 'left',
                }}
              >
                <summary
                  style={{
                    cursor: 'pointer',
                    fontWeight: 'var(--font-weight-semibold)',
                    color: 'var(--color-text-secondary)',
                    marginBottom: 'var(--space-sm)',
                  }}
                >
                  Error Details
                </summary>
                <code
                  style={{
                    display: 'block',
                    fontSize: 'var(--font-size-sm)',
                    color: 'var(--color-error)',
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-word',
                  }}
                >
                  {this.state.error.toString()}
                </code>
              </details>
            )}

            <div style={{ display: 'flex', gap: 'var(--space-md)', justifyContent: 'center' }}>
              <Button onClick={() => window.location.reload()} variant="secondary">
                Refresh Page
              </Button>
              <Button onClick={this.handleReset}>
                Go to Home
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
