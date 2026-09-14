import * as THREE from 'three';

export type LODTier = 'high' | 'medium' | 'low';
export type LODMode = 'auto' | 'high' | 'medium' | 'low';

export interface DeviceDiagnostics {
  isMobile: boolean;
  isTablet: boolean;
  isTouch: boolean;
  hardwareConcurrency: number;
  deviceMemory?: number;
  maxTextureSize: number;
  unmaskedRenderer: string;
  unmaskedVendor: string;
  isLowEndGPU: boolean;
  prefersReducedMotion: boolean;
  recommendedTier: LODTier;
  reason: string;
}

export interface LODProfile {
  tier: LODTier;
  label: string;
  name?: string;
  badge: string;
  description: string;
  // Room Virtual Tour 3D Model Specs
  sphereWidthSegments: number;
  sphereHeightSegments: number;
  spherePolyCount: number; // approximate triangles
  // Room Ambient Particles
  roomParticleCount: number;
  roomParticleSize: number;
  roomParticleAnimation: 'dynamic-orbit' | 'simplified-orbit' | 'static';
  // Background 3D Scene
  bgParticleCount: number;
  bgTorusSegments: {
    ring1: { radial: number; tubular: number };
    ring2: { radial: number; tubular: number };
  };
  bgIcosahedronDetail: number;
  bgParticleVertexAnimation: boolean;
  // Animation Intensity & Render Performance
  pixelRatio: number;
  antialias: boolean;
  autoOrbitSpeed: number;
  hotspotProjectionInterval: number; // frame skip interval
  cameraLerpFactor: number;
  powerPreference: 'high-performance' | 'default' | 'low-power';
}

export const LOD_PROFILES: Record<LODTier, LODProfile> = {
  high: {
    tier: 'high',
    label: 'High Fidelity',
    badge: 'Ultra 60FPS',
    description: 'High-density meshes (4,600+ triangles), 120 atmospheric particles, multi-sample antialiasing, and full-fidelity animation.',
    sphereWidthSegments: 64,
    sphereHeightSegments: 36,
    spherePolyCount: 4608,
    roomParticleCount: 120,
    roomParticleSize: 2.2,
    roomParticleAnimation: 'dynamic-orbit',
    bgParticleCount: 320,
    bgTorusSegments: {
      ring1: { radial: 8, tubular: 48 },
      ring2: { radial: 8, tubular: 64 }
    },
    bgIcosahedronDetail: 1,
    bgParticleVertexAnimation: true,
    pixelRatio: typeof window !== 'undefined' ? Math.min(window.devicePixelRatio || 1, 2) : 2,
    antialias: true,
    autoOrbitSpeed: 0.08,
    hotspotProjectionInterval: 1, // evaluate every single frame
    cameraLerpFactor: 0.1,
    powerPreference: 'high-performance'
  },
  medium: {
    tier: 'medium',
    label: 'Balanced Performance',
    badge: 'Balanced',
    description: 'Optimized 1,920 triangle sphere, 60 ambient particles, capped 1.5x pixel ratio, and balanced orbital physics.',
    sphereWidthSegments: 40,
    sphereHeightSegments: 24,
    spherePolyCount: 1920,
    roomParticleCount: 60,
    roomParticleSize: 2.0,
    roomParticleAnimation: 'simplified-orbit',
    bgParticleCount: 140,
    bgTorusSegments: {
      ring1: { radial: 6, tubular: 28 },
      ring2: { radial: 6, tubular: 32 }
    },
    bgIcosahedronDetail: 0,
    bgParticleVertexAnimation: true,
    pixelRatio: typeof window !== 'undefined' ? Math.min(window.devicePixelRatio || 1, 1.5) : 1.5,
    antialias: true,
    autoOrbitSpeed: 0.06,
    hotspotProjectionInterval: 2, // evaluate every 2nd frame
    cameraLerpFactor: 0.12,
    powerPreference: 'default'
  },
  low: {
    tier: 'low',
    label: 'Eco / Mobile Saver',
    badge: 'Eco LOD',
    description: 'Ultra-light 768 triangle sphere, 24 particles with GPU group rotation (0 CPU loops), 1.0x native DPR, zero antialias overhead.',
    sphereWidthSegments: 24,
    sphereHeightSegments: 16,
    spherePolyCount: 768,
    roomParticleCount: 24,
    roomParticleSize: 1.8,
    roomParticleAnimation: 'static',
    bgParticleCount: 40,
    bgTorusSegments: {
      ring1: { radial: 4, tubular: 16 },
      ring2: { radial: 4, tubular: 16 }
    },
    bgIcosahedronDetail: 0,
    bgParticleVertexAnimation: false, // disable expensive per-vertex CPU loop
    pixelRatio: 1.0, // strictly 1.0 to prevent mobile high-DPI GPU thermal throttle
    antialias: false,
    autoOrbitSpeed: 0.04,
    hotspotProjectionInterval: 3, // evaluate every 3rd frame
    cameraLerpFactor: 0.16,
    powerPreference: 'low-power'
  }
};

/**
 * Diagnostic helper to detect GPU capabilities and hardware constraints
 */
export function diagnoseDevice(): DeviceDiagnostics {
  if (typeof window === 'undefined') {
    return {
      isMobile: false,
      isTablet: false,
      isTouch: false,
      hardwareConcurrency: 8,
      maxTextureSize: 4096,
      unmaskedRenderer: 'SSR',
      unmaskedVendor: 'Unknown',
      isLowEndGPU: false,
      prefersReducedMotion: false,
      recommendedTier: 'high',
      reason: 'Server environment default'
    };
  }

  const width = window.innerWidth;
  const isMobile = width < 768;
  const isTablet = width >= 768 && width < 1024;
  const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  const hardwareConcurrency = navigator.hardwareConcurrency || 4;
  const deviceMemory = (navigator as unknown as { deviceMemory?: number }).deviceMemory;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let maxTextureSize = 4096;
  let unmaskedRenderer = 'Unknown GPU';
  let unmaskedVendor = 'Unknown Vendor';
  let isLowEndGPU = false;

  try {
    const canvas = document.createElement('canvas');
    const gl = (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')) as WebGLRenderingContext | null;
    if (gl) {
      maxTextureSize = gl.getParameter(gl.MAX_TEXTURE_SIZE) || 4096;
      const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
      if (debugInfo) {
        unmaskedRenderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) || '';
        unmaskedVendor = gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL) || '';
      }
    }
  } catch {
    // Canvas context may be restricted in sandboxed environments
  }

  // Check for common low-tier/integrated mobile GPUs
  const rendererLower = unmaskedRenderer.toLowerCase();
  const lowGpuKeywords = [
    'mali-4', 'mali-t', 'mali-g5', 'mali-g3',
    'adreno 3', 'adreno (tm) 3', 'adreno 4', 'adreno (tm) 4', 'adreno 5', 'adreno (tm) 50',
    'powervr', 'intel hd', 'intel(r) hd', 'intel uhd 6',
    'swiftshader', 'llvmpipe', 'software rasterizer'
  ];

  isLowEndGPU = lowGpuKeywords.some(keyword => rendererLower.includes(keyword));

  // Determine recommended LOD tier based on compound hardware metrics
  let recommendedTier: LODTier = 'high';
  let reason = 'High performance desktop with dedicated graphics';

  if (prefersReducedMotion) {
    recommendedTier = 'low';
    reason = 'System prefers reduced motion';
  } else if (isMobile) {
    if (hardwareConcurrency <= 4 || (deviceMemory && deviceMemory <= 4) || isLowEndGPU) {
      recommendedTier = 'low';
      reason = 'Budget/Compact mobile device detected: Low power Eco tier enabled';
    } else {
      recommendedTier = 'medium';
      reason = 'Modern mobile device: Balanced LOD tier enabled';
    }
  } else if (isTablet) {
    if (hardwareConcurrency <= 4 || isLowEndGPU) {
      recommendedTier = 'low';
      reason = 'Tablet with entry GPU/CPU: Eco tier enabled';
    } else {
      recommendedTier = 'medium';
      reason = 'Tablet device: Balanced LOD tier enabled';
    }
  } else if (hardwareConcurrency <= 4 || isLowEndGPU || (deviceMemory && deviceMemory <= 4)) {
    recommendedTier = 'medium';
    reason = 'Desktop with constrained CPU/GPU: Balanced tier enabled';
  }

  return {
    isMobile,
    isTablet,
    isTouch,
    hardwareConcurrency,
    deviceMemory,
    maxTextureSize,
    unmaskedRenderer,
    unmaskedVendor,
    isLowEndGPU,
    prefersReducedMotion,
    recommendedTier,
    reason
  };
}

/**
 * Real-time Adaptive FPS Profiler
 * Monitors live frame times and can automatically step down LOD if frame drops are sustained.
 */
export class RealtimeFPSProfiler {
  private frameTimes: number[] = [];
  private lastTime = performance.now();
  private maxSamples = 45;
  private currentFPS = 60;
  private lowFpsStreak = 0;
  private onDegradeCallback?: (newTier: LODTier) => void;
  private isAutoDegradeEnabled = true;

  constructor(onDegrade?: (newTier: LODTier) => void) {
    this.onDegradeCallback = onDegrade;
  }

  public recordFrame(): number {
    const now = performance.now();
    const delta = now - this.lastTime;
    this.lastTime = now;

    if (delta > 0) {
      const instantFPS = 1000 / delta;
      this.frameTimes.push(instantFPS);
      if (this.frameTimes.length > this.maxSamples) {
        this.frameTimes.shift();
      }

      const sum = this.frameTimes.reduce((a, b) => a + b, 0);
      this.currentFPS = Math.round(sum / this.frameTimes.length);

      // Check for sustained frame drop (< 26 FPS for consecutive samples)
      if (this.currentFPS < 26 && this.frameTimes.length >= 30) {
        this.lowFpsStreak++;
        if (this.lowFpsStreak > 40 && this.isAutoDegradeEnabled) {
          this.lowFpsStreak = 0;
          this.triggerDegrade();
        }
      } else {
        this.lowFpsStreak = Math.max(0, this.lowFpsStreak - 1);
      }
    }

    return this.currentFPS;
  }

  public getFPS(): number {
    return this.currentFPS;
  }

  public setAutoDegrade(enabled: boolean) {
    this.isAutoDegradeEnabled = enabled;
  }

  private triggerDegrade() {
    if (this.onDegradeCallback) {
      this.onDegradeCallback('low');
    }
  }

  public reset() {
    this.frameTimes = [];
    this.lastTime = performance.now();
    this.lowFpsStreak = 0;
  }
}

/**
 * Helper to construct an optimized SphereGeometry matching the given LOD profile
 */
export function createLODSphereGeometry(radius: number, profile: LODProfile): THREE.SphereGeometry {
  const geom = new THREE.SphereGeometry(
    radius,
    profile.sphereWidthSegments,
    profile.sphereHeightSegments
  );
  // Invert for interior panoramic projection
  geom.scale(-1, 1, 1);
  return geom;
}

/**
 * Helper to construct optimized floating ambient particles matching the given LOD profile
 */
export function createLODParticleSystem(
  count: number,
  spread: { x: number; y: number; z: number }
): {
  geometry: THREE.BufferGeometry;
  positions: Float32Array;
  scales: Float32Array;
} {
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(count * 3);
  const scales = new Float32Array(count);

  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * spread.x;
    positions[i * 3 + 1] = (Math.random() - 0.5) * spread.y;
    positions[i * 3 + 2] = (Math.random() - 0.5) * spread.z;
    scales[i] = Math.random() * 0.7 + 0.3;
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('scale', new THREE.BufferAttribute(scales, 1));

  return { geometry, positions, scales };
}
