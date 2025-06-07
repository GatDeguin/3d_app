import { useEffect, useState } from 'react';
export default function useWebGLCapabilities() {
  const [caps, setCaps] = useState({ pixelRatio: 1 });
  useEffect(() => {
    const gl = document.createElement('canvas').getContext('webgl2');
    setCaps({ pixelRatio: gl ? Math.min(window.devicePixelRatio, 2) : 1 });
  }, []);
  return caps;
}
