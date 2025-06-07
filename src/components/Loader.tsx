import React from 'react';
import { Dom } from '@react-three/drei';

export default function Loader({ progress }: { progress: number }) {
  return (
    <Dom center>
      <div className="loader">Cargando: {progress.toFixed(0)}%</div>
    </Dom>
  );
}
