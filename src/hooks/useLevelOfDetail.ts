import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { useHotel } from '../context/HotelContext';
import {
  LODTier,
  LODMode,
  LODProfile,
  LOD_PROFILES,
  diagnoseDevice,
  DeviceDiagnostics,
  RealtimeFPSProfiler
} from '../utils/lodManager';

export function useLevelOfDetail() {
  const { threeSettings, update3DSettings } = useHotel();
  
  // Static device diagnostics
  const [diagnostics, setDiagnostics] = useState<DeviceDiagnostics>(() => diagnoseDevice());
  
  // Real-time FPS state
  const [fps, setFps] = useState<number>(60);
  const [autoDegradedTier, setAutoDegradedTier] = useState<LODTier | null>(null);

  // Update diagnostics on window resize (e.g. device rotation or browser resizing)
  useEffect(() => {
    const handleResize = () => {
      setDiagnostics(diagnoseDevice());
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const mode: LODMode = (threeSettings.lodMode as LODMode) || 'auto';

  // Real-time FPS Profiler with auto-degrade callback
  const profilerRef = useRef<RealtimeFPSProfiler | null>(null);
  if (!profilerRef.current) {
    profilerRef.current = new RealtimeFPSProfiler((newTier: LODTier) => {
      if (mode === 'auto') {
        setAutoDegradedTier(newTier);
      }
    });
  }

  // Active LOD Tier determination
  const activeTier: LODTier = useMemo(() => {
    if (mode === 'auto') {
      if (autoDegradedTier) {
        return autoDegradedTier;
      }
      return diagnostics.recommendedTier;
    }
    return mode;
  }, [mode, autoDegradedTier, diagnostics.recommendedTier]);

  // Active LOD Profile object
  const profile: LODProfile = useMemo(() => {
    return LOD_PROFILES[activeTier] || LOD_PROFILES.medium;
  }, [activeTier]);

  // Mode switcher
  const setMode = useCallback((newMode: LODMode) => {
    setAutoDegradedTier(null);
    update3DSettings({
      ...threeSettings,
      lodMode: newMode
    });
  }, [threeSettings, update3DSettings]);

  // Frame tick recorder for components
  const recordFrame = useCallback(() => {
    if (profilerRef.current) {
      const currentFps = profilerRef.current.recordFrame();
      // Periodically update React state without flooding re-renders
      if (Math.random() < 0.1) {
        setFps(currentFps);
      }
      return currentFps;
    }
    return 60;
  }, []);

  const resetProfiler = useCallback(() => {
    profilerRef.current?.reset();
    setAutoDegradedTier(null);
  }, []);

  return {
    diagnostics,
    mode,
    activeTier,
    profile,
    fps,
    isAutoDegraded: autoDegradedTier !== null,
    setMode,
    recordFrame,
    resetProfiler,
    isMobile: diagnostics.isMobile,
    isLowEnd: diagnostics.isLowEndGPU || diagnostics.hardwareConcurrency <= 4
  };
}
