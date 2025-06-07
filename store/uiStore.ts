import { proxy } from 'valtio';
interface UIState { bloomIntensity: number; focusDistance: number; metalness: number; fps: number }
export const uiState = proxy<UIState>({ bloomIntensity: 1.2, focusDistance: 0.02, metalness: 0.7, fps: 0 });
let last = performance.now();
function tick() { const now = performance.now(); uiState.fps = 1000/(now-last); last=now; requestAnimationFrame(tick); }
requestAnimationFrame(tick);
