import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { ErrorBoundary } from './components/ErrorBoundary';
import { MotionConfig } from 'motion/react';
import { initializeFirebaseAnalytics } from './services/firebase';

void initializeFirebaseAnalytics();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <MotionConfig reducedMotion="user"><App /></MotionConfig>
    </ErrorBoundary>
  </StrictMode>,
);
