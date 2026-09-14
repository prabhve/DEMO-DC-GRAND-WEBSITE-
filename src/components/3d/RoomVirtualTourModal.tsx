import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Maximize2,
  Minimize2,
  Compass,
  RotateCw,
  Sparkles,
  Info,
  Calendar,
  Layers,
  Check,
  Eye,
  ChevronRight,
  Smartphone,
  Zap,
  Gauge,
  Cpu,
  ChevronDown,
  Sliders,
  ShieldCheck,
  AlertTriangle
} from 'lucide-react';
import { useHotel } from '../../context/HotelContext';
import { useLevelOfDetail } from '../../hooks/useLevelOfDetail';
import {
  createLODSphereGeometry,
  createLODParticleSystem,
  LODMode,
  LOD_PROFILES
} from '../../utils/lodManager';
import { VIRTUAL_TOUR_ROOMS, RoomTourData } from '../../data/virtualTourData';
import { RoomPerspective, RoomHotspot } from '../../types/hotel';

export const RoomVirtualTourModal: React.FC = () => {
  const {
    isVirtualTourOpen,
    closeVirtualTour,
    virtualTourRoomId,
    rooms,
    openBookingModal,
    setActiveRoomForDetail
  } = useHotel();

  // LOD System integration
  const {
    profile,
    activeTier,
    mode,
    setMode,
    fps,
    recordFrame,
    isAutoDegraded,
    diagnostics
  } = useLevelOfDetail();

  const [showLODDropdown, setShowLODDropdown] = useState(false);
  const particlesRef = useRef<THREE.Points | null>(null);
  const profileRef = useRef(profile);
  const frameCountRef = useRef(0);

  useEffect(() => {
    profileRef.current = profile;
  }, [profile]);

  // Selected room inside the tour
  const [selectedRoomId, setSelectedRoomId] = useState<string>(
    virtualTourRoomId || 'room-super-deluxe'
  );

  useEffect(() => {
    if (virtualTourRoomId) {
      setSelectedRoomId(virtualTourRoomId);
    }
  }, [virtualTourRoomId]);

  // Current tour data
  const tourData: RoomTourData = useMemo(() => {
    return VIRTUAL_TOUR_ROOMS[selectedRoomId] || VIRTUAL_TOUR_ROOMS['room-super-deluxe'];
  }, [selectedRoomId]);

  // Active perspective inside current room
  const [activePerspectiveId, setActivePerspectiveId] = useState<string>(
    tourData.defaultPerspectiveId
  );

  useEffect(() => {
    setActivePerspectiveId(tourData.defaultPerspectiveId);
  }, [tourData]);

  const currentPerspective: RoomPerspective = useMemo(() => {
    return (
      tourData.perspectives.find((p) => p.id === activePerspectiveId) ||
      tourData.perspectives[0]
    );
  }, [tourData, activePerspectiveId]);

  // Three.js and Interaction States
  const mountRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isAutoOrbit, setIsAutoOrbit] = useState(true);
  const [showHotspots, setShowHotspots] = useState(true);
  const [selectedHotspot, setSelectedHotspot] = useState<RoomHotspot | null>(null);
  const [isLoadingTexture, setIsLoadingTexture] = useState(true);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [gyroActive, setGyroActive] = useState(false);

  // Screen-projected hotspot coordinates
  const [projectedHotspots, setProjectedHotspots] = useState<
    { hotspot: RoomHotspot; screenX: number; screenY: number; isVisible: boolean }[]
  >([]);

  // Refs for Three.js instance
  const threeState = useRef<{
    renderer: THREE.WebGLRenderer | null;
    scene: THREE.Scene | null;
    camera: THREE.PerspectiveCamera | null;
    sphereMesh: THREE.Mesh | null;
    animFrameId: number;
    isUserInteracting: boolean;
    onPointerDownPointerX: number;
    onPointerDownPointerY: number;
    onPointerDownLon: number;
    onPointerDownLat: number;
    lon: number;
    lat: number;
    phi: number;
    theta: number;
    targetFov: number;
    currentFov: number;
    textureLoader: THREE.TextureLoader;
  }>({
    renderer: null,
    scene: null,
    camera: null,
    sphereMesh: null,
    animFrameId: 0,
    isUserInteracting: false,
    onPointerDownPointerX: 0,
    onPointerDownPointerY: 0,
    onPointerDownLon: 0,
    onPointerDownLat: 0,
    lon: 0,
    lat: 0,
    phi: 0,
    theta: 0,
    targetFov: 70,
    currentFov: 70,
    textureLoader: new THREE.TextureLoader()
  });

  // Filter hotspots for current perspective
  const currentHotspots = useMemo(() => {
    return tourData.hotspots.filter(
      (h) => !h.perspective || h.perspective === activePerspectiveId
    );
  }, [tourData, activePerspectiveId]);

  // Load new texture onto sphere when perspective changes
  const updateSphereTexture = useCallback((imageUrl: string) => {
    const state = threeState.current;
    if (!state.sphereMesh) return;

    setIsLoadingTexture(true);
    state.textureLoader.load(
      imageUrl,
      (texture) => {
        texture.mapping = THREE.EquirectangularReflectionMapping;
        texture.minFilter = THREE.LinearFilter;
        texture.magFilter = THREE.LinearFilter;
        texture.generateMipmaps = false;

        const material = new THREE.MeshBasicMaterial({
          map: texture
        });

        if (state.sphereMesh) {
          // Dispose old material
          if (Array.isArray(state.sphereMesh.material)) {
            state.sphereMesh.material.forEach((m) => m.dispose());
          } else {
            state.sphereMesh.material.dispose();
          }
          state.sphereMesh.material = material;
        }
        setIsLoadingTexture(false);
      },
      undefined,
      (err) => {
        console.warn('Failed to load tour texture, using fallback:', err);
        setIsLoadingTexture(false);
      }
    );
  }, []);

  // Initialize Three.js Scene
  useEffect(() => {
    if (!isVirtualTourOpen) return;
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(70, width / height, 1, 1100);

    const renderer = new THREE.WebGLRenderer({
      antialias: profile.antialias,
      alpha: false,
      powerPreference: profile.powerPreference
    });
    renderer.setPixelRatio(profile.pixelRatio);
    renderer.setSize(width, height);
    container.replaceChildren(renderer.domElement);

    // Inverted sphere for 360 panoramic interior with LOD poly count
    const geometry = createLODSphereGeometry(500, profile);

    const material = new THREE.MeshBasicMaterial({
      color: 0x1a1c24
    });
    const sphereMesh = new THREE.Mesh(geometry, material);
    scene.add(sphereMesh);

    // Subtle atmospheric warm particles with LOD density
    const { geometry: particleGeometry } = createLODParticleSystem(profile.roomParticleCount, {
      x: 350,
      y: 200,
      z: 350
    });
    const particleMaterial = new THREE.PointsMaterial({
      color: 0xc5a880,
      size: profile.roomParticleSize,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending
    });
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);
    particlesRef.current = particles;

    // Store references
    threeState.current.scene = scene;
    camera.fov = 70;
    camera.updateProjectionMatrix();
    threeState.current.camera = camera;
    threeState.current.renderer = renderer;
    threeState.current.sphereMesh = sphereMesh;
    threeState.current.lon = 0;
    threeState.current.lat = 0;

    // Load initial texture
    updateSphereTexture(currentPerspective.image);

    // Animation Loop
    let animId = 0;
    const animate = () => {
      animId = requestAnimationFrame(animate);

      // Record frame for real-time FPS profiler and automatic low-end degrade
      recordFrame();

      const state = threeState.current;
      if (!state.camera || !state.renderer || !state.scene) return;

      const activeProfile = profileRef.current;

      // Auto-orbit when idle with LOD-adjusted speed
      if (isAutoOrbit && !state.isUserInteracting && !gyroActive) {
        state.lon += activeProfile.autoOrbitSpeed;
      }

      // Constrain latitude (-85 to +85)
      state.lat = Math.max(-85, Math.min(85, state.lat));
      state.phi = THREE.MathUtils.degToRad(90 - state.lat);
      state.theta = THREE.MathUtils.degToRad(state.lon);

      // Camera target vector
      const target = new THREE.Vector3();
      target.x = 500 * Math.sin(state.phi) * Math.cos(state.theta);
      target.y = 500 * Math.cos(state.phi);
      target.z = 500 * Math.sin(state.phi) * Math.sin(state.theta);
      state.camera.lookAt(target);

      // Smooth FOV zoom lerp with LOD factor
      if (Math.abs(state.currentFov - state.targetFov) > 0.1) {
        state.currentFov += (state.targetFov - state.currentFov) * activeProfile.cameraLerpFactor;
        state.camera.fov = state.currentFov;
        state.camera.updateProjectionMatrix();
      }

      // Rotate particles if animation is enabled in current LOD profile
      if (particlesRef.current && activeProfile.roomParticleAnimation !== 'static') {
        particlesRef.current.rotation.y += 0.0006;
      }

      // Render scene
      state.renderer.render(state.scene, state.camera);

      // Throttled 2D hotspot projection calculation based on LOD interval
      frameCountRef.current++;
      if (
        container &&
        currentHotspots.length > 0 &&
        frameCountRef.current % activeProfile.hotspotProjectionInterval === 0
      ) {
        const w = container.clientWidth;
        const h = container.clientHeight;
        const forward = new THREE.Vector3();
        state.camera.getWorldDirection(forward);

        const calculated = currentHotspots.map((hspot) => {
          const pos = new THREE.Vector3(...hspot.position);
          const dir = pos.clone().normalize();
          const dot = dir.dot(forward);

          const screenPos = pos.clone().project(state.camera);
          const screenX = ((screenPos.x + 1) * w) / 2;
          const screenY = ((-screenPos.y + 1) * h) / 2;

          return {
            hotspot: hspot,
            screenX,
            screenY,
            isVisible:
              dot > 0.25 &&
              screenX >= 20 &&
              screenX <= w - 20 &&
              screenY >= 20 &&
              screenY <= h - 20
          };
        });

        setProjectedHotspots(calculated);
      }
    };

    animId = requestAnimationFrame(animate);
    threeState.current.animFrameId = animId;

    // Handle Window Resize
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
      particlesRef.current = null;
      if (container && renderer.domElement) {
        container.innerHTML = '';
      }
    };
  }, [isVirtualTourOpen, isAutoOrbit, currentHotspots, gyroActive, updateSphereTexture, recordFrame]);

  // Seamless Hot-swap of LOD Geometry and Particles when LOD tier changes (no canvas remount)
  useEffect(() => {
    const state = threeState.current;
    if (!state.sphereMesh || !state.renderer) return;

    // Hot-swap sphere geometry matching new poly count
    const oldSphereGeom = state.sphereMesh.geometry;
    const newSphereGeom = createLODSphereGeometry(500, profile);
    state.sphereMesh.geometry = newSphereGeom;
    oldSphereGeom.dispose();

    // Hot-swap particles matching new count & size
    if (particlesRef.current) {
      const oldParticleGeom = particlesRef.current.geometry;
      const { geometry: newParticleGeom } = createLODParticleSystem(profile.roomParticleCount, {
        x: 350,
        y: 200,
        z: 350
      });
      particlesRef.current.geometry = newParticleGeom;
      (particlesRef.current.material as THREE.PointsMaterial).size = profile.roomParticleSize;
      oldParticleGeom.dispose();
    }

    // Update pixel ratio
    state.renderer.setPixelRatio(profile.pixelRatio);
  }, [profile]);

  // Update texture when currentPerspective changes
  useEffect(() => {
    if (isVirtualTourOpen) {
      updateSphereTexture(currentPerspective.image);
    }
  }, [currentPerspective, isVirtualTourOpen, updateSphereTexture]);

  // Pointer drag event handlers
  const handlePointerDown = (e: React.PointerEvent) => {
    const state = threeState.current;
    state.isUserInteracting = true;
    state.onPointerDownPointerX = e.clientX;
    state.onPointerDownPointerY = e.clientY;
    state.onPointerDownLon = state.lon;
    state.onPointerDownLat = state.lat;
    setHasInteracted(true);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    const state = threeState.current;
    if (!state.isUserInteracting) return;
    const factor = 0.15;
    state.lon = (state.onPointerDownPointerX - e.clientX) * factor + state.onPointerDownLon;
    state.lat = (e.clientY - state.onPointerDownPointerY) * factor + state.onPointerDownLat;
  };

  const handlePointerUp = () => {
    threeState.current.isUserInteracting = false;
  };

  // Wheel zoom
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const state = threeState.current;
    const delta = e.deltaY * 0.05;
    state.targetFov = Math.max(45, Math.min(85, state.targetFov + delta));
  };

  // Zoom buttons
  const zoomIn = () => {
    threeState.current.targetFov = Math.max(45, threeState.current.targetFov - 10);
  };

  const zoomOut = () => {
    threeState.current.targetFov = Math.min(85, threeState.current.targetFov + 10);
  };

  const resetView = () => {
    threeState.current.lon = 0;
    threeState.current.lat = 0;
    threeState.current.targetFov = 70;
    setSelectedHotspot(null);
  };

  // Gyroscope / Device orientation
  const toggleGyroscope = () => {
    if (gyroActive) {
      setGyroActive(false);
      return;
    }

    if (
      typeof DeviceOrientationEvent !== 'undefined' &&
      // @ts-expect-error iOS Safari permission request API
      typeof DeviceOrientationEvent.requestPermission === 'function'
    ) {
      // @ts-expect-error iOS Safari permission request API
      DeviceOrientationEvent.requestPermission()
        .then((permissionState: string) => {
          if (permissionState === 'granted') {
            enableGyroListener();
          }
        })
        .catch(console.error);
    } else if ('ondeviceorientation' in window) {
      enableGyroListener();
    }
  };

  const enableGyroListener = () => {
    setGyroActive(true);
    setIsAutoOrbit(false);
    const handleOrientation = (e: DeviceOrientationEvent) => {
      if (e.alpha !== null && e.beta !== null) {
        threeState.current.lon = e.alpha;
        threeState.current.lat = Math.max(-85, Math.min(85, (e.beta - 90) * 0.8));
      }
    };
    window.addEventListener('deviceorientation', handleOrientation, true);
  };

  // Fullscreen toggle
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      mountRef.current?.requestFullscreen?.();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.();
      setIsFullscreen(false);
    }
  };

  if (!isVirtualTourOpen) return null;

  const currentRoom = rooms.find((r) => r.id === selectedRoomId) || rooms[0];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-[#07080b]">
        {/* Three.js Canvas Container with Gesture Listeners */}
        <div
          ref={mountRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
          onWheel={handleWheel}
          className="absolute inset-0 cursor-grab active:cursor-grabbing touch-none select-none z-0"
          id="three-virtual-tour-canvas"
        />

        {/* 3D Hotspot Overlays */}
        {showHotspots && (
          <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
            {projectedHotspots.map(({ hotspot, screenX, screenY, isVisible }) => {
              if (!isVisible) return null;
              const isSelected = selectedHotspot?.id === hotspot.id;

              return (
                <div
                  key={hotspot.id}
                  style={{
                    transform: `translate3d(${screenX}px, ${screenY}px, 0)`,
                    left: 0,
                    top: 0
                  }}
                  className="absolute pointer-events-auto -translate-x-1/2 -translate-y-1/2 transition-transform duration-75"
                >
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedHotspot(isSelected ? null : hotspot);
                    }}
                    className="group relative flex items-center justify-center p-2"
                    aria-label={`Inspect ${hotspot.title}`}
                  >
                    {/* Pulsing ring */}
                    <span className="absolute w-8 h-8 rounded-full bg-[#c5a880]/30 animate-ping" />
                    <span className="relative w-7 h-7 rounded-full bg-[#0c0d10]/90 border border-[#c5a880] shadow-[0_0_15px_rgba(197,168,128,0.6)] flex items-center justify-center text-[#f3e5d0] hover:scale-125 transition-transform">
                      <Sparkles className="w-3.5 h-3.5 text-[#c5a880]" />
                    </span>

                    {/* Floating label pill */}
                    <span className="absolute left-full ml-2.5 px-2.5 py-1 rounded-full bg-[#0c0d10]/90 border border-[#c5a880]/40 text-[11px] text-[#f3e5d0] whitespace-nowrap opacity-90 group-hover:opacity-100 group-hover:scale-105 shadow-xl transition-all">
                      {hotspot.title}
                    </span>
                  </button>
                </div>
              );
            })}
          </div>
        )}

        {/* Selected Hotspot Detail Card */}
        <AnimatePresence>
          {selectedHotspot && (
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              className="absolute bottom-28 left-1/2 -translate-x-1/2 z-20 w-full max-w-sm px-4 pointer-events-auto"
            >
              <div className="p-4 sm:p-5 rounded-2xl bg-[#0e1017]/95 backdrop-blur-xl border border-[#c5a880]/50 shadow-[0_20px_50px_rgba(0,0,0,0.8)] text-left">
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#c5a880]/20 text-[#c5a880] text-[10px] font-bold uppercase tracking-wider">
                    {selectedHotspot.tag}
                  </span>
                  <button
                    onClick={() => setSelectedHotspot(null)}
                    className="w-6 h-6 rounded-full bg-[#1e212b] text-[#a09a8e] hover:text-[#f3e5d0] flex items-center justify-center"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
                <h4 className="font-serif-luxury text-lg text-[#f3e5d0] font-normal mb-1">
                  {selectedHotspot.title}
                </h4>
                <p className="text-xs text-[#d1ccc0] font-light leading-relaxed mb-3">
                  {selectedHotspot.description}
                </p>
                <div className="flex items-center justify-between pt-2 border-t border-[#2a2723] text-[11px] text-[#c5a880]">
                  <span>Featured amenity in {tourData.roomName}</span>
                  <Check className="w-3.5 h-3.5 text-[#c5a880]" />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Top Header HUD */}
        <div className="absolute top-0 inset-x-0 p-4 sm:p-6 flex items-center justify-between z-20 bg-gradient-to-b from-black/80 via-black/40 to-transparent pointer-events-none">
          <div className="pointer-events-auto flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#0c0d10]/90 border border-[#c5a880]/40 flex items-center justify-center shadow-lg">
              <Compass className="w-5 h-5 text-[#c5a880] animate-spin-slow" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#c5a880] font-bold">
                  360° 3D Virtual Tour
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              <h2 className="font-serif-luxury text-xl sm:text-2xl text-[#f3e5d0] font-normal leading-tight">
                {tourData.roomName}
              </h2>
            </div>
          </div>

          <div className="pointer-events-auto flex items-center gap-2 sm:gap-3">
            {/* Level of Detail (LOD) & Real-time Performance Monitor */}
            <div className="relative">
              <button
                onClick={() => setShowLODDropdown((prev) => !prev)}
                className={`px-3 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-all shadow-md ${
                  activeTier === 'low'
                    ? 'bg-amber-900/40 border-amber-500/60 text-amber-300 hover:bg-amber-900/60'
                    : activeTier === 'medium'
                    ? 'bg-blue-900/40 border-blue-500/60 text-blue-300 hover:bg-blue-900/60'
                    : 'bg-[#c5a880]/20 border-[#c5a880]/60 text-[#f3e5d0] hover:bg-[#c5a880]/30'
                }`}
                title="LOD Graphics & Performance Controls"
                id="tour-lod-dropdown-btn"
              >
                <Zap className="w-3.5 h-3.5 text-[#c5a880]" />
                <span className="font-mono text-[11px] font-bold">{fps} FPS</span>
                <span className="hidden sm:inline opacity-60">•</span>
                <span className="hidden sm:inline uppercase text-[10px] tracking-wider font-bold">
                  {mode === 'auto' ? `Auto (${profile.badge})` : profile.badge}
                </span>
                <ChevronDown className={`w-3 h-3 transition-transform ${showLODDropdown ? 'rotate-180' : ''}`} />
              </button>

              {/* LOD & Performance Popover */}
              <AnimatePresence>
                {showLODDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 top-full mt-2 w-80 sm:w-96 rounded-2xl bg-[#0c0d10]/95 backdrop-blur-xl border border-[#c5a880]/40 p-4 shadow-2xl z-50 text-[#f3e5d0]"
                  >
                    <div className="flex items-center justify-between pb-3 border-b border-[#2a2723]">
                      <div className="flex items-center gap-2">
                        <Gauge className="w-4 h-4 text-[#c5a880]" />
                        <h4 className="text-xs uppercase tracking-widest font-bold text-[#c5a880]">
                          Graphics & LOD Control
                        </h4>
                      </div>
                      <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#1a1c24] border border-[#2a2723] text-emerald-400">
                        {fps} FPS Live
                      </span>
                    </div>

                    {/* Hardware Diagnostics Specs */}
                    <div className="mt-3 p-2.5 rounded-xl bg-[#14161d]/80 border border-[#262833] space-y-1.5 text-[11px]">
                      <div className="flex justify-between text-[#a09a8e]">
                        <span>Device Class:</span>
                        <span className="text-[#e5e3dc] font-medium capitalize">
                          {diagnostics.isMobile ? 'Mobile' : diagnostics.isTablet ? 'Tablet' : 'Desktop'}
                          {diagnostics.isLowEnd ? ' (Low-power/Battery Saver)' : ' (High Performance)'}
                        </span>
                      </div>
                      <div className="flex justify-between text-[#a09a8e]">
                        <span>3D Mesh Detail:</span>
                        <span className="text-[#c5a880] font-mono">
                          {profile.spherePolyCount.toLocaleString()} Polys ({profile.sphereWidthSegments}×{profile.sphereHeightSegments})
                        </span>
                      </div>
                      <div className="flex justify-between text-[#a09a8e]">
                        <span>Ambient Particles:</span>
                        <span className="text-[#e5e3dc] font-mono">{profile.roomParticleCount} motes</span>
                      </div>
                      <div className="flex justify-between text-[#a09a8e]">
                        <span>Resolution / DPR:</span>
                        <span className="text-[#e5e3dc] font-mono">{profile.pixelRatio}x DPR {profile.antialias ? '(Antialiased)' : '(Fast)'}</span>
                      </div>
                    </div>

                    {/* Quality Selection Options */}
                    <div className="mt-3 space-y-2">
                      <div className="text-[10px] uppercase tracking-wider text-[#a09a8e] font-bold">
                        Choose Rendering Tier
                      </div>
                      {(['auto', 'high', 'medium', 'low'] as LODMode[]).map((tierKey) => {
                        const isSelected = mode === tierKey;
                        const tierProfile = tierKey === 'auto' ? profile : LOD_PROFILES[tierKey];
                        return (
                          <button
                            key={tierKey}
                            onClick={() => {
                              setMode(tierKey);
                              setShowLODDropdown(false);
                            }}
                            className={`w-full p-2.5 rounded-xl border text-left flex items-start gap-2.5 transition-all ${
                              isSelected
                                ? 'bg-[#c5a880]/20 border-[#c5a880] text-[#f3e5d0]'
                                : 'bg-[#14161d]/50 border-[#262833] hover:bg-[#1a1c24] text-[#a09a8e] hover:text-[#f3e5d0]'
                            }`}
                          >
                            <div className="mt-0.5">
                              {isSelected ? (
                                <Check className="w-3.5 h-3.5 text-[#c5a880]" />
                              ) : (
                                <div className="w-3.5 h-3.5 rounded-full border border-[#444]" />
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <span className="text-xs font-bold capitalize text-[#f3e5d0]">
                                  {tierKey === 'auto' ? 'Auto (Smart Adaptive)' : tierProfile.label}
                                </span>
                                <span className="text-[10px] font-mono text-[#c5a880]">
                                  {tierProfile.spherePolyCount.toLocaleString()} Triangles
                                </span>
                              </div>
                              <p className="text-[10px] text-[#8e897e] mt-0.5 leading-snug">
                                {tierKey === 'auto'
                                  ? 'Automatically degrades poly count & motion when framerate dips below 26 FPS'
                                  : tierProfile.description}
                              </p>
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    <div className="mt-3 pt-2 border-t border-[#2a2723] flex justify-between items-center text-[10px] text-[#8e897e]">
                      <span>{diagnostics.unmaskedRenderer ? diagnostics.unmaskedRenderer.substring(0, 32) : 'WebGL 2.0 accelerated'}</span>
                      <button
                        onClick={() => setShowLODDropdown(false)}
                        className="text-[#c5a880] hover:underline uppercase font-bold"
                      >
                        Close
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Hotspot Visibility Toggle */}
            <button
              onClick={() => setShowHotspots((prev) => !prev)}
              className={`px-3 py-1.5 rounded-xl border text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 transition-all ${
                showHotspots
                  ? 'bg-[#c5a880]/20 border-[#c5a880] text-[#c5a880]'
                  : 'bg-[#0c0d10]/80 border-[#2a2723] text-[#a09a8e] hover:text-[#f3e5d0]'
              }`}
              title="Toggle interactive 3D amenity pins"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{showHotspots ? 'Pins On' : 'Pins Off'}</span>
            </button>

            {/* Auto Orbit Toggle */}
            <button
              onClick={() => setIsAutoOrbit((prev) => !prev)}
              className={`px-3 py-1.5 rounded-xl border text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 transition-all ${
                isAutoOrbit
                  ? 'bg-[#c5a880]/20 border-[#c5a880] text-[#c5a880]'
                  : 'bg-[#0c0d10]/80 border-[#2a2723] text-[#a09a8e] hover:text-[#f3e5d0]'
              }`}
              title="Auto rotation"
            >
              <RotateCw className={`w-3.5 h-3.5 ${isAutoOrbit ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">{isAutoOrbit ? 'Auto-Orbit' : 'Manual'}</span>
            </button>

            {/* Gyroscope toggle (mobile) */}
            <button
              onClick={toggleGyroscope}
              className={`p-2 rounded-xl border text-xs flex items-center justify-center transition-all ${
                gyroActive
                  ? 'bg-[#c5a880] text-[#0c0d10] border-[#c5a880]'
                  : 'bg-[#0c0d10]/80 border-[#2a2723] text-[#a09a8e] hover:text-[#f3e5d0]'
              }`}
              title="Motion / Gyroscope look-around"
            >
              <Smartphone className="w-4 h-4" />
            </button>

            {/* Fullscreen Toggle */}
            <button
              onClick={toggleFullscreen}
              className="p-2 rounded-xl bg-[#0c0d10]/80 border border-[#2a2723] text-[#e5e3dc] hover:text-[#c5a880] hover:border-[#c5a880]/40 transition-all"
              aria-label="Toggle Fullscreen"
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>

            {/* Close Tour */}
            <button
              onClick={closeVirtualTour}
              className="w-10 h-10 rounded-full bg-[#0c0d10]/90 border border-[#c5a880]/50 text-[#f3e5d0] hover:bg-[#c5a880] hover:text-[#0c0d10] flex items-center justify-center shadow-2xl transition-all"
              aria-label="Close Virtual Tour"
              id="close-virtual-tour-btn"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Dynamic Low-end Auto-Degradation Banner */}
        <AnimatePresence>
          {isAutoDegraded && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-20 left-1/2 -translate-x-1/2 z-25 pointer-events-auto px-4 py-2 rounded-full bg-amber-950/90 border border-amber-500/50 backdrop-blur-md flex items-center gap-2 text-xs text-amber-200 shadow-2xl"
            >
              <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Smart LOD: Lowered 3D poly count & particles to maintain smooth 60 FPS on your hardware.</span>
              <button
                onClick={() => setMode('high')}
                className="ml-2 px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 text-[10px] uppercase font-bold"
              >
                Force High
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* First-interaction onboarding hint banner */}
        {!hasInteracted && (
          <div className="absolute top-24 left-1/2 -translate-x-1/2 z-20 pointer-events-none px-4 py-2 rounded-full bg-[#0c0d10]/85 backdrop-blur-md border border-[#c5a880]/40 text-xs text-[#f3e5d0] flex items-center gap-2 shadow-2xl animate-bounce">
            <Eye className="w-3.5 h-3.5 text-[#c5a880]" />
            <span>Click and drag in any direction to explore the room • Tap pins for details</span>
          </div>
        )}

        {/* Texture loading indicator */}
        {isLoadingTexture && (
          <div className="absolute inset-0 flex items-center justify-center z-15 bg-[#07080b]/70 backdrop-blur-sm pointer-events-none">
            <div className="flex flex-col items-center gap-3">
              <div className="w-10 h-10 border-2 border-[#c5a880] border-t-transparent rounded-full animate-spin" />
              <span className="text-xs uppercase tracking-widest text-[#c5a880]">
                Rendering 360° Interior...
              </span>
            </div>
          </div>
        )}

        {/* Right Floating Quick Tools: Zoom In, Zoom Out, Reset */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-2 pointer-events-auto">
          <button
            onClick={zoomIn}
            className="w-10 h-10 rounded-xl bg-[#0c0d10]/80 backdrop-blur-md border border-[#2a2723] text-[#f3e5d0] hover:bg-[#c5a880] hover:text-[#0c0d10] flex items-center justify-center transition-all shadow-lg font-bold"
            title="Zoom in"
          >
            +
          </button>
          <button
            onClick={zoomOut}
            className="w-10 h-10 rounded-xl bg-[#0c0d10]/80 backdrop-blur-md border border-[#2a2723] text-[#f3e5d0] hover:bg-[#c5a880] hover:text-[#0c0d10] flex items-center justify-center transition-all shadow-lg font-bold"
            title="Zoom out"
          >
            -
          </button>
          <button
            onClick={resetView}
            className="w-10 h-10 rounded-xl bg-[#0c0d10]/80 backdrop-blur-md border border-[#2a2723] text-[#f3e5d0] hover:bg-[#c5a880] hover:text-[#0c0d10] flex items-center justify-center transition-all shadow-lg"
            title="Reset viewing angle"
          >
            <Compass className="w-4 h-4" />
          </button>
        </div>

        {/* Bottom Navigation Deck: Room Switcher & Perspective Vantages */}
        <div className="absolute bottom-0 inset-x-0 p-4 sm:p-6 bg-gradient-to-t from-black/95 via-black/70 to-transparent z-20 pointer-events-none flex flex-col gap-3">
          {/* Internal Vantage / Perspective Tabs */}
          <div className="pointer-events-auto flex items-center justify-center gap-2 overflow-x-auto py-1">
            <span className="text-[11px] uppercase tracking-wider text-[#a09a8e] font-medium hidden sm:inline mr-2 flex items-center gap-1">
              <Layers className="w-3.5 h-3.5 text-[#c5a880]" />
              Vantages:
            </span>
            {tourData.perspectives.map((persp) => {
              const isActive = persp.id === activePerspectiveId;
              return (
                <button
                  key={persp.id}
                  onClick={() => {
                    setActivePerspectiveId(persp.id);
                    setSelectedHotspot(null);
                  }}
                  className={`px-3 py-1.5 rounded-full text-xs transition-all whitespace-nowrap flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-[#c5a880] text-[#0c0d10] font-bold shadow-[0_0_15px_rgba(197,168,128,0.5)] scale-105'
                      : 'bg-[#12141c]/90 text-[#a09a8e] border border-[#2a2723] hover:border-[#c5a880]/40 hover:text-[#f3e5d0]'
                  }`}
                >
                  <span>{persp.label}</span>
                </button>
              );
            })}
          </div>

          {/* Bottom Bar: Room Switcher & Book Now CTA */}
          <div className="pointer-events-auto max-w-5xl mx-auto w-full p-2.5 sm:p-3 rounded-2xl bg-[#0c0d10]/90 backdrop-blur-xl border border-[#c5a880]/30 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-3">
            {/* Room Category Picker */}
            <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
              {rooms
                .filter((r) => r.isActive)
                .map((room) => {
                  const isSelected = room.id === selectedRoomId;
                  return (
                    <button
                      key={room.id}
                      onClick={() => {
                        setSelectedRoomId(room.id);
                        setSelectedHotspot(null);
                      }}
                      className={`px-3 py-1.5 rounded-xl text-xs uppercase tracking-wider transition-all shrink-0 ${
                        isSelected
                          ? 'bg-[#c5a880]/20 text-[#c5a880] border border-[#c5a880] font-semibold'
                          : 'bg-[#151720] text-[#7d776d] border border-transparent hover:text-[#d1ccc0]'
                      }`}
                    >
                      {room.name}
                    </button>
                  );
                })}
            </div>

            {/* Room Summary & CTAs */}
            <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
              {currentRoom && (
                <button
                  onClick={() => {
                    closeVirtualTour();
                    setActiveRoomForDetail(currentRoom);
                  }}
                  className="px-4 py-2 rounded-xl border border-[#2a2723] text-[#d1ccc0] hover:text-[#c5a880] hover:border-[#c5a880]/40 text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-1.5"
                >
                  <Info className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Details</span>
                </button>
              )}

              <button
                onClick={() => {
                  const rId = selectedRoomId;
                  closeVirtualTour();
                  openBookingModal(rId);
                }}
                className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#c5a880] to-[#b39366] text-[#0c0d10] font-bold text-xs uppercase tracking-wider hover:shadow-[0_0_20px_rgba(197,168,128,0.4)] transition-all flex items-center justify-center gap-2"
                id="virtual-tour-book-btn"
              >
                <Calendar className="w-4 h-4" />
                <span>Request Booking</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </AnimatePresence>
  );
};
