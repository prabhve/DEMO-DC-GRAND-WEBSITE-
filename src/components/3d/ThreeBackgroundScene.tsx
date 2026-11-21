import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { useHotel } from '../../context/HotelContext';
import { useLevelOfDetail } from '../../hooks/useLevelOfDetail';

function isSoftwareWebGL(): boolean {
  try {
    const c = document.createElement('canvas');
    const gl = c.getContext('webgl') || c.getContext('experimental-webgl');
    if (!gl) return true;
    const ext = (gl as WebGLRenderingContext).getExtension('WEBGL_debug_renderer_info');
    if (!ext) return false;
    const rendererInfo = (gl as WebGLRenderingContext).getParameter(ext.UNMASKED_RENDERER_WEBGL) || '';
    return /SwiftShader|Software|llvmpipe|Mesa OffScreen|Microsoft Basic Render/i.test(String(rendererInfo));
  } catch {
    return true;
  }
}

export const ThreeBackgroundScene: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { threeSettings } = useHotel();
  const { profile, activeTier } = useLevelOfDetail();
  const [fallbackActive, setFallbackActive] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isSmallMobile = window.innerWidth < 768;

    // Avoid unnecessary background WebGL GPU cost on small mobile screens or software renderers
    if (isSmallMobile || prefersReducedMotion || isSoftwareWebGL() || !threeSettings.heroAnimationEnabled) {
      setFallbackActive(true);
      return;
    }
    setFallbackActive(false);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: profile.antialias,
        powerPreference: profile.powerPreference
      });
    } catch {
      setFallbackActive(true);
      return;
    }

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x201d19, 0.002);

    const camera = new THREE.PerspectiveCamera(
      55,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 42;
    camera.position.y = 0;

    renderer.setPixelRatio(Math.min(profile.pixelRatio, 1.75));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);

    container.appendChild(renderer.domElement);

    // Warm Champagne & Muted Teal atmospheric lighting
    const ambientLight = new THREE.AmbientLight(0xf5f1e9, 0.55);
    scene.add(ambientLight);

    const goldPointLight = new THREE.PointLight(0xb69a69, 2.0, 85);
    goldPointLight.position.set(12, 16, 22);
    scene.add(goldPointLight);

    const tealFillLight = new THREE.PointLight(0x536e68, 1.5, 75);
    tealFillLight.position.set(-16, -10, 12);
    scene.add(tealFillLight);

    // Atmospheric Dust System with controlled particle count
    const particleCount = Math.min(profile.bgParticleCount, 90);
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 85;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 85;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 55;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
      gradient.addColorStop(0, 'rgba(245, 241, 233, 0.9)');
      gradient.addColorStop(0.35, 'rgba(182, 154, 105, 0.6)');
      gradient.addColorStop(1, 'rgba(182, 154, 105, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 32, 32);
    }
    const particleTexture = new THREE.CanvasTexture(canvas);

    const particleMaterial = new THREE.PointsMaterial({
      size: activeTier === 'low' ? 1.1 : 1.4,
      map: particleTexture,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // Subtle Architectural Wireframe Geometry
    const ringGroup = new THREE.Group();

    const ringMaterial = new THREE.MeshBasicMaterial({
      color: 0xb69a69,
      wireframe: true,
      transparent: true,
      opacity: 0.07
    });

    const ringGeom1 = new THREE.TorusGeometry(
      13,
      0.04,
      profile.bgTorusSegments.ring1.radial,
      profile.bgTorusSegments.ring1.tubular
    );
    const ring1 = new THREE.Mesh(ringGeom1, ringMaterial);
    ring1.rotation.x = Math.PI / 3;
    ringGroup.add(ring1);

    const ringGeom2 = new THREE.TorusGeometry(
      19,
      0.035,
      profile.bgTorusSegments.ring2.radial,
      profile.bgTorusSegments.ring2.tubular
    );
    const ring2 = new THREE.Mesh(ringGeom2, ringMaterial);
    ring2.rotation.y = Math.PI / 4;
    ringGroup.add(ring2);

    ringGroup.position.set(14, -4, -12);
    scene.add(ringGroup);

    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    let scrollY = 0;
    let targetScrollY = 0;
    let isTabVisible = !document.hidden;

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    const handleScroll = () => {
      scrollY = window.scrollY;
    };

    const handleVisibilityChange = () => {
      isTabVisible = !document.hidden;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('visibilitychange', handleVisibilityChange);

    const handleResize = () => {
      if (!container) return;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Skip GPU render calls when tab is hidden
      if (!isTabVisible) return;

      const elapsedTime = clock.getElapsedTime();
      const speedMult = threeSettings.animationSpeed || 1;

      targetX += (mouseX - targetX) * 0.04;
      targetY += (mouseY - targetY) * 0.04;
      targetScrollY += (scrollY - targetScrollY) * 0.07;

      const maxScroll = Math.max(document.body.scrollHeight - window.innerHeight, 1);
      const scrollProgress = targetScrollY / maxScroll;

      camera.position.z = 42 - scrollProgress * 12;
      camera.position.y = -scrollProgress * 20 + targetY * 1.4;
      camera.position.x = Math.sin(scrollProgress * Math.PI * 2) * 2 + targetX * 1.8;
      camera.lookAt(targetX, -scrollProgress * 20, 0);

      particles.rotation.y = elapsedTime * 0.02 * speedMult;
      ringGroup.rotation.x = elapsedTime * 0.06 * speedMult + scrollProgress * 1.4;
      ringGroup.rotation.y = elapsedTime * 0.09 * speedMult + scrollProgress * 1.1;
      ringGroup.position.y = -4 - scrollProgress * 16;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      particleGeometry.dispose();
      particleMaterial.dispose();
      particleTexture.dispose();
      ringGeom1.dispose();
      ringGeom2.dispose();
      ringMaterial.dispose();
      renderer.dispose();
    };
  }, [threeSettings, profile, activeTier]);

  if (fallbackActive) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      id="three-background-canvas"
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      style={{ opacity: 0.65 }}
    />
  );
};
