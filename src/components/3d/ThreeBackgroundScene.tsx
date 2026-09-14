import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useHotel } from '../../context/HotelContext';
import { useLevelOfDetail } from '../../hooks/useLevelOfDetail';

export const ThreeBackgroundScene: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { threeSettings } = useHotel();
  const { profile, activeTier } = useLevelOfDetail();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check user preferences for reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Setup scene, camera, renderer with LOD profiles
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0c0d10, 0.0018);

    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 40;
    camera.position.y = 0;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: profile.antialias,
      powerPreference: profile.powerPreference
    });
    renderer.setPixelRatio(profile.pixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);

    container.appendChild(renderer.domElement);

    // Warm atmospheric lighting
    const ambientLight = new THREE.AmbientLight(0xfff4e0, 0.6);
    scene.add(ambientLight);

    const goldPointLight = new THREE.PointLight(0xc5a880, 2.5, 80);
    goldPointLight.position.set(10, 15, 20);
    scene.add(goldPointLight);

    const warmFillLight = new THREE.PointLight(0xb58e58, 1.8, 70);
    warmFillLight.position.set(-15, -10, 10);
    scene.add(warmFillLight);

    // Floating Golden Dust / Atmospheric Particle System with LOD tier count
    const particleCount = prefersReducedMotion ? 30 : profile.bgParticleCount;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const scales = new Float32Array(particleCount);
    const opacities = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 80;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 80;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 60;
      scales[i] = Math.random() * 0.8 + 0.2;
      opacities[i] = Math.random() * 0.7 + 0.2;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute('scale', new THREE.BufferAttribute(scales, 1));

    // Particle texture (soft circular glow)
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
      gradient.addColorStop(0, 'rgba(232, 215, 190, 1)');
      gradient.addColorStop(0.3, 'rgba(197, 168, 128, 0.7)');
      gradient.addColorStop(1, 'rgba(197, 168, 128, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 32, 32);
    }
    const particleTexture = new THREE.CanvasTexture(canvas);

    const particleMaterial = new THREE.PointsMaterial({
      size: activeTier === 'low' ? 1.2 : 1.6,
      map: particleTexture,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // Architectural 3D floating rings with LOD segments
    const ringGroup = new THREE.Group();

    const ringMaterial = new THREE.MeshBasicMaterial({
      color: 0xc5a880,
      wireframe: true,
      transparent: true,
      opacity: 0.12
    });

    const ringGeom1 = new THREE.TorusGeometry(
      12,
      0.05,
      profile.bgTorusSegments.ring1.radial,
      profile.bgTorusSegments.ring1.tubular
    );
    const ring1 = new THREE.Mesh(ringGeom1, ringMaterial);
    ring1.rotation.x = Math.PI / 3;
    ringGroup.add(ring1);

    const ringGeom2 = new THREE.TorusGeometry(
      18,
      0.04,
      profile.bgTorusSegments.ring2.radial,
      profile.bgTorusSegments.ring2.tubular
    );
    const ring2 = new THREE.Mesh(ringGeom2, ringMaterial);
    ring2.rotation.y = Math.PI / 4;
    ringGroup.add(ring2);

    const ringGeom3 = new THREE.IcosahedronGeometry(7, profile.bgIcosahedronDetail);
    const ringMaterial2 = new THREE.MeshBasicMaterial({
      color: 0xe8d7be,
      wireframe: true,
      transparent: true,
      opacity: 0.08
    });
    const octa = new THREE.Mesh(ringGeom3, ringMaterial2);
    ringGroup.add(octa);

    ringGroup.position.set(12, -4, -10);
    scene.add(ringGroup);

    // Mouse and scroll variables for continuous 3D camera travel
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    let scrollY = 0;
    let targetScrollY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    const handleScroll = () => {
      scrollY = window.scrollY;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Handle Window Resize
    const handleResize = () => {
      if (!container) return;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();
      const speedMult = threeSettings.animationSpeed || 1;

      // Smooth mouse interpolation
      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;

      // Smooth scroll interpolation
      targetScrollY += (scrollY - targetScrollY) * 0.08;

      const maxScroll = Math.max(document.body.scrollHeight - window.innerHeight, 1);
      const scrollProgress = targetScrollY / maxScroll;

      // 3D Camera forward flight & parallax through the hotel space
      if (threeSettings.heroAnimationEnabled && !prefersReducedMotion) {
        // As user scrolls, camera gently glides forward and shifts view
        camera.position.z = 40 - scrollProgress * 15;
        camera.position.y = -scrollProgress * 25 + targetY * 2;
        camera.position.x = Math.sin(scrollProgress * Math.PI * 2) * 3 + targetX * 2.5;
        camera.lookAt(targetX * 1.5, -scrollProgress * 25, 0);

        // Particle motion based on LOD capability
        if (profile.bgParticleVertexAnimation) {
          // Dynamic wavy motion on capable devices
          const posAttr = particleGeometry.attributes.position as THREE.BufferAttribute;
          const arr = posAttr.array as Float32Array;
          for (let i = 0; i < particleCount; i++) {
            arr[i * 3 + 1] += Math.sin(elapsedTime * speedMult + i) * 0.02;
            arr[i * 3] += Math.cos(elapsedTime * speedMult * 0.7 + i) * 0.015;
          }
          posAttr.needsUpdate = true;
        } else {
          // Ultra lightweight GPU group rotation on Mobile/Eco tier (0 CPU vertex loop!)
          particles.rotation.y = elapsedTime * 0.04 * speedMult;
        }

        // Rotate subtle architectural rings
        ringGroup.rotation.x = elapsedTime * 0.1 * speedMult + scrollProgress * 2;
        ringGroup.rotation.y = elapsedTime * 0.15 * speedMult + scrollProgress * 1.5;
        ringGroup.position.y = -4 - scrollProgress * 20;

        // Light pulse (only on High/Medium to preserve fragment cycles on budget devices)
        if (activeTier !== 'low') {
          goldPointLight.intensity = 2.0 + Math.sin(elapsedTime * 1.5) * 0.5;
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    // Clean up
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      particleGeometry.dispose();
      particleMaterial.dispose();
      particleTexture.dispose();
      ringGeom1.dispose();
      ringGeom2.dispose();
      ringGeom3.dispose();
      ringMaterial.dispose();
      ringMaterial2.dispose();
      renderer.dispose();
    };
  }, [threeSettings, profile, activeTier]);

  return (
    <div
      ref={containerRef}
      id="three-background-canvas"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      style={{ opacity: 0.85 }}
    />
  );
};
