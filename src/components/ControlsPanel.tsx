import React, { useEffect } from 'react';
import { Pane } from 'tweakpane';
import { uiState } from '../store/uiStore';
import { motion } from 'framer-motion';

export default function ControlsPanel() {
  useEffect(() => {
    const pane = new Pane({ title: 'Parámetros' });
    pane.addInput(uiState, 'bloomIntensity', { min: 0, max: 3, step: 0.1 });
    pane.addInput(uiState, 'focusDistance', { min: 0, max: 1, step: 0.01 });
    pane.addInput(uiState, 'metalness', { min: 0, max: 1, step: 0.01 });
    return () => pane.dispose();
  }, []);

  return <motion.div initial={{ x: 200, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="controls-panel" />;
}
