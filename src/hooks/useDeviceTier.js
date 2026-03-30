import { useState, useEffect } from 'react';

function detectTier() {
  if (typeof window === 'undefined') return 'high';

  const w = window.innerWidth;
  const touch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  const mobile = /Android|iPhone|iPad|iPod|webOS|BlackBerry|Opera Mini/i.test(navigator.userAgent);

  if (w >= 1024 && !mobile) return 'high';
  if (w >= 768 && !touch) return 'high';

  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (gl) {
      const ext = gl.getExtension('WEBGL_debug_renderer_info');
      if (ext) {
        const renderer = gl.getParameter(ext.UNMASKED_RENDERER_WEBGL).toLowerCase();
        const weak = ['mali-4', 'mali-t', 'adreno 3', 'adreno 4', 'powervr', 'sgx', 'vivante'];
        if (weak.some(g => renderer.includes(g))) return 'low';
      }
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    }
  } catch (_) {}

  if (mobile || touch) return 'low';
  return 'high';
}

let cached = null;

export function useDeviceTier() {
  const [tier, setTier] = useState(() => cached || detectTier());

  useEffect(() => {
    if (!cached) {
      cached = detectTier();
      setTier(cached);
    }
  }, []);

  return tier;
}

export function getDeviceTier() {
  if (!cached) cached = detectTier();
  return cached;
}
