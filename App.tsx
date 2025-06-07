import React, { Suspense } from 'react';
import CanvasScene from './components/CanvasScene';
import ControlsPanel from './components/ControlsPanel';
import HUD from './components/HUD';
import Loader from './components/Loader';
import ErrorBoundary from './components/ErrorBoundary';
import './styles.css';

export default function App() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<Loader progress={0} />}>
        <CanvasScene />
      </Suspense>
      <ControlsPanel />
      <HUD />
    </ErrorBoundary>
  );
}
