import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppContextProvider } from './context/AppContext';
import { RoutineContextProvider } from './context/RoutineContext';
import { WorkoutContextProvider } from './context/WorkoutContext';
import { HistoryContextProvider } from './context/HistoryContext';
import { AppShell } from './components/layout/AppShell';
import { PageTransition } from './components/layout/PageTransition';
import { LoadingSpinner } from './components/ui/LoadingSpinner';

// Lazy load pages for code splitting
const HomePage = lazy(() => import('./pages/HomePage').then(module => ({ default: module.HomePage })));
const RoutinesPage = lazy(() => import('./pages/RoutinesPage').then(module => ({ default: module.RoutinesPage })));
const WorkoutPage = lazy(() => import('./pages/WorkoutPage').then(module => ({ default: module.WorkoutPage })));
const HistoryPage = lazy(() => import('./pages/HistoryPage').then(module => ({ default: module.HistoryPage })));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage').then(module => ({ default: module.NotFoundPage })));

function App() {
  return (
    <AppContextProvider>
      <RoutineContextProvider>
        <WorkoutContextProvider>
          <HistoryContextProvider>
            <BrowserRouter>
              <AppShell>
                <Suspense
                  fallback={
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        minHeight: '60vh',
                      }}
                    >
                      <LoadingSpinner size="lg" />
                    </div>
                  }
                >
                  <Routes>
                    <Route path="/" element={<PageTransition><HomePage /></PageTransition>} />
                    <Route path="/routines" element={<PageTransition><RoutinesPage /></PageTransition>} />
                    <Route path="/workout" element={<PageTransition><WorkoutPage /></PageTransition>} />
                    <Route path="/history" element={<PageTransition><HistoryPage /></PageTransition>} />
                    <Route path="*" element={<PageTransition><NotFoundPage /></PageTransition>} />
                  </Routes>
                </Suspense>
              </AppShell>
            </BrowserRouter>
          </HistoryContextProvider>
        </WorkoutContextProvider>
      </RoutineContextProvider>
    </AppContextProvider>
  );
}

export default App;
