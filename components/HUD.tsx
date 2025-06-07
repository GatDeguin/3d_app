import React from 'react';
import { useSnapshot } from 'valtio';
import { uiState } from '../store/uiStore';

export default function HUD() {
  const snap = useSnapshot(uiState);
  return (
    <div className="hud">
      <p>FPS: {snap.fps.toFixed(1)}</p>
      <p>Bloom: {snap.bloomIntensity.toFixed(2)}</p>
    </div>
  );
}
