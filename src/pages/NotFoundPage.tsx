import { Link } from 'react-router-dom';
import { Container } from '../components/layout/Container';
import { Card, CardBody } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Home } from 'lucide-react';

export function NotFoundPage() {
  return (
    <Container>
      <div style={{ maxWidth: '600px', margin: '0 auto', paddingTop: 'var(--space-3xl)' }}>
        <Card>
          <CardBody>
            <div style={{ textAlign: 'center', padding: 'var(--space-xl)' }}>
              <h1 style={{ fontSize: 'var(--font-size-4xl)', marginBottom: 'var(--space-md)' }}>404</h1>
              <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--space-xl)' }}>
                Page not found. This route doesn't exist.
              </p>
              <Link to="/">
                <Button icon={<Home size={20} />}>Back to Home</Button>
              </Link>
            </div>
          </CardBody>
        </Card>
      </div>
    </Container>
  );
}
