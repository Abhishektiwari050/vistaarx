"use client";

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';

gsap.registerPlugin(ScrollTrigger);

export const Component = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const scrollProgressRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const smoothCameraPos = useRef({ x: 0, y: 30, z: 100 });
  
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentSection, setCurrentSection] = useState(1);
  const [isVisible, setIsVisible] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const totalSections = 2;
  
  const threeRefs = useRef<{
    scene: THREE.Scene | null;
    camera: THREE.PerspectiveCamera | null;
    renderer: THREE.WebGLRenderer | null;
    composer: EffectComposer | null;
    stars: THREE.Points[];
    nebula: THREE.Mesh | null;
    mountains: THREE.Mesh[];
    animationId: number | null;
    targetCameraX?: number;
    targetCameraY?: number;
    targetCameraZ?: number;
    locations?: number[];
  }>({
    scene: null,
    camera: null,
    renderer: null,
    composer: null,
    stars: [],
    nebula: null,
    mountains: [],
    animationId: null
  });

  // Initialize Three.js
  useEffect(() => {
    const { current: refs } = threeRefs;
    if (!canvasRef.current) return;

    const initThree = () => {
      // Scene setup
      refs.scene = new THREE.Scene();
      refs.scene.fog = new THREE.FogExp2(0x000000, 0.00025);

      // Camera
      refs.camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        2000
      );
      refs.camera.position.z = 100;
      refs.camera.position.y = 20;

      // Renderer
      refs.renderer = new THREE.WebGLRenderer({
        canvas: canvasRef.current!,
        antialias: true,
        alpha: true
      });
      refs.renderer.setSize(window.innerWidth, window.innerHeight);
      refs.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      refs.renderer.toneMapping = THREE.ACESFilmicToneMapping;
      refs.renderer.toneMappingExposure = 0.5;

      // Post-processing
      refs.composer = new EffectComposer(refs.renderer);
      const renderPass = new RenderPass(refs.scene, refs.camera);
      refs.composer.addPass(renderPass);

      const bloomPass = new UnrealBloomPass(
        new THREE.Vector2(window.innerWidth, window.innerHeight),
        0.8,
        0.4,
        0.85
      );
      refs.composer.addPass(bloomPass);

      // Create scene elements
      createStarField();
      createNebula();
      createMountains();
      createAtmosphere();
      getLocation();

      // Start animation
      animate();
      
      // Mark as ready after Three.js is initialized
      setIsReady(true);
    };

    const createStarField = () => {
      const starCount = 5000;
      
      for (let i = 0; i < 3; i++) {
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(starCount * 3);
        const colors = new Float32Array(starCount * 3);
        const sizes = new Float32Array(starCount);

        for (let j = 0; j < starCount; j++) {
          const radius = 200 + Math.random() * 800;
          const theta = Math.random() * Math.PI * 2;
          const phi = Math.acos(Math.random() * 2 - 1);

          positions[j * 3] = radius * Math.sin(phi) * Math.cos(theta);
          positions[j * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
          positions[j * 3 + 2] = radius * Math.cos(phi);

          // Color variation
          const color = new THREE.Color();
          const colorChoice = Math.random();
          if (colorChoice < 0.7) {
            color.setHSL(0, 0, 0.8 + Math.random() * 0.2);
          } else if (colorChoice < 0.9) {
            color.setHSL(0.08, 0.5, 0.8);
          } else {
            color.setHSL(0.6, 0.5, 0.8);
          }
          
          colors[j * 3] = color.r;
          colors[j * 3 + 1] = color.g;
          colors[j * 3 + 2] = color.b;

          sizes[j] = Math.random() * 2 + 0.5;
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

        const material = new THREE.ShaderMaterial({
          uniforms: {
            time: { value: 0 },
            depth: { value: i }
          },
          vertexShader: `
            attribute float size;
            attribute vec3 color;
            varying vec3 vColor;
            uniform float time;
            uniform float depth;
            
            void main() {
              vColor = color;
              vec3 pos = position;
              
              // Slow rotation based on depth
              float angle = time * 0.05 * (1.0 - depth * 0.3);
              mat2 rot = mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
              pos.xy = rot * pos.xy;
              
              vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
              gl_PointSize = size * (300.0 / -mvPosition.z);
              gl_Position = projectionMatrix * mvPosition;
            }
          `,
          fragmentShader: `
            varying vec3 vColor;
            
            void main() {
              float dist = length(gl_PointCoord - vec2(0.5));
              if (dist > 0.5) discard;
              
              float opacity = 1.0 - smoothstep(0.0, 0.5, dist);
              gl_FragColor = vec4(vColor, opacity);
            }
          `,
          transparent: true,
          blending: THREE.AdditiveBlending,
          depthWrite: false
        });

        const stars = new THREE.Points(geometry, material);
        refs.scene?.add(stars);
        refs.stars.push(stars);
      }
    };

    const createNebula = () => {
      const geometry = new THREE.PlaneGeometry(8000, 4000, 100, 100);
      const material = new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0 },
          color1: { value: new THREE.Color(0x0033ff) },
          color2: { value: new THREE.Color(0xff0066) },
          opacity: { value: 0.3 }
        },
        vertexShader: `
          varying vec2 vUv;
          varying float vElevation;
          uniform float time;
          
          void main() {
            vUv = uv;
            vec3 pos = position;
            
            float elevation = sin(pos.x * 0.01 + time) * cos(pos.y * 0.01 + time) * 20.0;
            pos.z += elevation;
            vElevation = elevation;
            
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
          }
        `,
        fragmentShader: `
          uniform vec3 color1;
          uniform vec3 color2;
          uniform float opacity;
          uniform float time;
          varying vec2 vUv;
          varying float vElevation;
          
          void main() {
            float mixFactor = sin(vUv.x * 10.0 + time) * cos(vUv.y * 10.0 + time);
            vec3 color = mix(color1, color2, mixFactor * 0.5 + 0.5);
            
            float alpha = opacity * (1.0 - length(vUv - 0.5) * 2.0);
            alpha *= 1.0 + vElevation * 0.01;
            
            gl_FragColor = vec4(color, alpha);
          }
        `,
        transparent: true,
        blending: THREE.AdditiveBlending,
        side: THREE.DoubleSide,
        depthWrite: false
      });

      const nebula = new THREE.Mesh(geometry, material);
      nebula.position.z = -1050;
      nebula.rotation.x = 0;
      refs.scene?.add(nebula);
      refs.nebula = nebula;
    };

    const createMountains = () => {
      const layers = [
        { distance: -50, height: 60, color: 0x1a1a2e, opacity: 1 },
        { distance: -100, height: 80, color: 0x16213e, opacity: 0.8 },
        { distance: -150, height: 100, color: 0x0f3460, opacity: 0.6 },
        { distance: -200, height: 120, color: 0x0a4668, opacity: 0.4 }
      ];

      layers.forEach((layer, index) => {
        const points = [];
        const segments = 50;
        
        for (let i = 0; i <= segments; i++) {
          const x = (i / segments - 0.5) * 1000;
          const y = Math.sin(i * 0.1) * layer.height + 
                   Math.sin(i * 0.05) * layer.height * 0.5 +
                   Math.random() * layer.height * 0.2 - 100;
          points.push(new THREE.Vector2(x, y));
        }
        
        points.push(new THREE.Vector2(5000, -300));
        points.push(new THREE.Vector2(-5000, -300));

        const shape = new THREE.Shape(points);
        const geometry = new THREE.ShapeGeometry(shape);
        const material = new THREE.MeshBasicMaterial({
          color: layer.color,
          transparent: true,
          opacity: layer.opacity,
          side: THREE.DoubleSide
        });

        const mountain = new THREE.Mesh(geometry, material);
        mountain.position.z = layer.distance;
        mountain.position.y = layer.distance;
        mountain.userData = { baseZ: layer.distance, index };
        refs.scene?.add(mountain);
        refs.mountains.push(mountain);
      });
    };

    const createAtmosphere = () => {
      const geometry = new THREE.SphereGeometry(600, 32, 32);
      const material = new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0 }
        },
        vertexShader: `
          varying vec3 vNormal;
          varying vec3 vPosition;
          
          void main() {
            vNormal = normalize(normalMatrix * normal);
            vPosition = position;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          varying vec3 vNormal;
          varying vec3 vPosition;
          uniform float time;
          
          void main() {
            float intensity = pow(0.7 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
            vec3 atmosphere = vec3(0.3, 0.6, 1.0) * intensity;
            
            float pulse = sin(time * 2.0) * 0.1 + 0.9;
            atmosphere *= pulse;
            
            gl_FragColor = vec4(atmosphere, intensity * 0.25);
          }
        `,
        side: THREE.BackSide,
        blending: THREE.AdditiveBlending,
        transparent: true
      });

      const atmosphere = new THREE.Mesh(geometry, material);
      refs.scene?.add(atmosphere);
    };

    const animate = () => {
      refs.animationId = requestAnimationFrame(animate);
      
      const time = Date.now() * 0.001;

      // Update stars
      refs.stars.forEach((starField) => {
        if (starField.material instanceof THREE.ShaderMaterial) {
          starField.material.uniforms.time.value = time;
        }
      });

      // Update nebula
      if (refs.nebula && refs.nebula.material instanceof THREE.ShaderMaterial) {
        refs.nebula.material.uniforms.time.value = time * 0.5;
      }

      // Smooth camera movement with easing
      if (refs.camera && refs.targetCameraX !== undefined && refs.targetCameraY !== undefined && refs.targetCameraZ !== undefined) {
        const smoothingFactor = 0.05; // Lower = smoother but slower
        
        // Calculate smooth position with easing
        smoothCameraPos.current.x += (refs.targetCameraX - smoothCameraPos.current.x) * smoothingFactor;
        smoothCameraPos.current.y += (refs.targetCameraY - smoothCameraPos.current.y) * smoothingFactor;
        smoothCameraPos.current.z += (refs.targetCameraZ - smoothCameraPos.current.z) * smoothingFactor;
        
        // Add subtle floating motion
        const floatX = Math.sin(time * 0.1) * 2;
        const floatY = Math.cos(time * 0.15) * 1;
        
        // Apply final position
        refs.camera.position.x = smoothCameraPos.current.x + floatX;
        refs.camera.position.y = smoothCameraPos.current.y + floatY;
        refs.camera.position.z = smoothCameraPos.current.z;
        refs.camera.lookAt(0, 10, -600);
      }

      // Parallax mountains with subtle animation
      refs.mountains.forEach((mountain, i) => {
        const parallaxFactor = 1 + i * 0.5;
        mountain.position.x = Math.sin(time * 0.1) * 2 * parallaxFactor;
        mountain.position.y = 50 + (Math.cos(time * 0.15) * 1 * parallaxFactor);
      });

      if (refs.composer) {
        refs.composer.render();
      }
    };

    initThree();

    // Handle resize
    const handleResize = () => {
      if (refs.camera && refs.renderer && refs.composer) {
        refs.camera.aspect = window.innerWidth / window.innerHeight;
        refs.camera.updateProjectionMatrix();
        refs.renderer.setSize(window.innerWidth, window.innerHeight);
        refs.composer.setSize(window.innerWidth, window.innerHeight);
      }
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      if (refs.animationId) {
        cancelAnimationFrame(refs.animationId);
      }

      window.removeEventListener('resize', handleResize);

      const safeDisposeMaterial = (mat: THREE.Material | THREE.Material[]) => {
        if (Array.isArray(mat)) {
          mat.forEach(m => m.dispose());
        } else {
          mat.dispose();
        }
      };

      // Dispose Three.js resources
      refs.stars.forEach(starField => {
        starField.geometry.dispose();
        safeDisposeMaterial(starField.material);
      });

      refs.mountains.forEach(mountain => {
        mountain.geometry.dispose();
        safeDisposeMaterial(mountain.material);
      });

      if (refs.nebula) {
        refs.nebula.geometry.dispose();
        safeDisposeMaterial(refs.nebula.material);
      }

      if (refs.renderer) {
        refs.renderer.dispose();
      }
    };
  }, []);

  const getLocation = () => {
    const { current: refs } = threeRefs;
    const locations: number[] = [];
    refs.mountains.forEach((mountain, i) => {
      locations[i] = mountain.position.z;
    });
    refs.locations = locations;
  };

  // GSAP Animations - Run after component is ready
  useEffect(() => {
    if (!isReady) return;
    
    // Set initial states to prevent flash
    gsap.set([menuRef.current, titleRef.current, subtitleRef.current, scrollProgressRef.current], {
      visibility: 'visible'
    });

    const tl = gsap.timeline();

    // Animate menu
    if (menuRef.current) {
      tl.from(menuRef.current, {
        x: -100,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
      });
    }

    // Animate title with split text
    if (titleRef.current) {
      // Split characters manually
      const text = titleRef.current.innerText || "";
      titleRef.current.innerHTML = text.split("").map(char => `<span class="title-char inline-block">${char}</span>`).join("");
      
      const titleChars = titleRef.current.querySelectorAll('.title-char');
      tl.from(titleChars, {
        y: 200,
        opacity: 0,
        duration: 1.5,
        stagger: 0.05,
        ease: "power4.out"
      }, "-=0.5");
    }

    // Animate subtitle lines
    if (subtitleRef.current) {
      const subtitleLines = subtitleRef.current.querySelectorAll('.subtitle-line');
      tl.from(subtitleLines, {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out"
      }, "-=0.8");
    }

    // Animate scroll indicator
    if (scrollProgressRef.current) {
      tl.from(scrollProgressRef.current, {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power2.out"
      }, "-=0.5");
    }

    return () => {
      tl.kill();
    };
  }, [isReady]);

  // Scroll handling
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      
      // Determine if the Three.js canvas and UI overlays should be visible
      const visible = scrollY >= windowHeight * 0.45;
      setIsVisible(visible);

      // Section starts at windowHeight and spans 2 * windowHeight (since container is 300vh)
      const sectionStart = windowHeight;
      const sectionDuration = windowHeight * 2;
      
      const relativeScrollY = Math.max(0, Math.min(scrollY - sectionStart, sectionDuration));
      const progress = sectionDuration > 0 ? relativeScrollY / sectionDuration : 0;
      
      setScrollProgress(progress);
      
      // Equal split for 3 sections (indices 0, 1, 2)
      const newSection = Math.min(Math.floor(progress * 3), 2);
      setCurrentSection(newSection);

      const { current: refs } = threeRefs;
      
      // Calculate smooth progress through each individual section segment
      let segmentProgress = 0;
      if (newSection === 0) {
        segmentProgress = progress / 0.33;
      } else if (newSection === 1) {
        segmentProgress = (progress - 0.33) / 0.33;
      } else {
        segmentProgress = (progress - 0.66) / 0.34;
      }
      segmentProgress = Math.max(0, Math.min(segmentProgress, 1));
      
      // Define camera positions for each section
      const cameraPositions = [
        { x: 0, y: 30, z: 300 },    // Section 0 - REFUSAL
        { x: 0, y: 40, z: -50 },     // Section 1 - PERFORMANCE
        { x: 0, y: 50, z: -700 }       // Section 2 - OWNERSHIP
      ];
      
      // Get current and next positions
      const currentPos = cameraPositions[newSection] || cameraPositions[0];
      const nextPos = cameraPositions[newSection + 1] || currentPos;
      
      // Set target positions (actual smoothing happens in animate loop)
      refs.targetCameraX = currentPos.x + (nextPos.x - currentPos.x) * segmentProgress;
      refs.targetCameraY = currentPos.y + (nextPos.y - currentPos.y) * segmentProgress;
      refs.targetCameraZ = currentPos.z + (nextPos.z - currentPos.z) * segmentProgress;
      // Smooth parallax for mountains
      refs.mountains.forEach((mountain, i) => {
        const speed = 1 + i * 0.9;
        const targetZ = mountain.userData.baseZ + relativeScrollY * speed * 0.5;
        if (refs.nebula) {
          refs.nebula.position.z = (targetZ + progress * speed * 0.01) - 100;
        }
        
        // Use the same smoothing approach
        mountain.userData.targetZ = targetZ;
        if (progress > 0.7) {
          mountain.position.z = 600000;
        }
        if (progress < 0.7 && refs.locations) {
          mountain.position.z = refs.locations[i];
        }
      });
      if (refs.nebula && refs.mountains[3]) {
        refs.nebula.position.z = refs.mountains[3].position.z;
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Set initial position
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [totalSections, isReady]);

  return (
    <div ref={containerRef} className="hero-container cosmos-style relative w-full h-[300vh] overflow-hidden bg-black text-white">
      <canvas ref={canvasRef} className={`hero-canvas fixed inset-0 w-full h-full pointer-events-none z-0 transition-opacity duration-705 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`} />
      
      {/* Side menu */}
      <div ref={menuRef} className={`side-menu fixed left-8 top-1/2 -translate-y-1/2 z-20 flex flex-col items-center gap-4 text-white transition-opacity duration-705 ${
        isVisible ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`} style={{ visibility: 'hidden' }}>
        <div className="menu-icon flex flex-col gap-1 w-6 cursor-pointer">
          <span className="h-0.5 w-6 bg-white"></span>
          <span className="h-0.5 w-6 bg-white"></span>
          <span className="h-0.5 w-4 bg-white"></span>
        </div>
        <div className="vertical-text font-mono text-[9px] tracking-widest uppercase rotate-90 origin-center whitespace-nowrap mt-8">MANIFESTO</div>
      </div>

      {/* Main content - Section 1 */}
      <div className={`hero-content cosmos-content fixed inset-0 flex flex-col justify-center items-center text-center z-10 pointer-events-none px-6 transition-all duration-700 ${
        isVisible && currentSection === 0 ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-12"
      }`}>
        <h1 ref={titleRef} className="hero-title font-display font-black text-fluid-hero leading-none uppercase tracking-tighter text-white">
          REFUSAL
        </h1>
        
        <div ref={subtitleRef} className="hero-subtitle cosmos-subtitle mt-6 space-y-2 text-zinc-450 font-sans text-xs sm:text-sm max-w-md">
          <p className="subtitle-line block">
            We refuse bloated plug-ins and pre-built templates.
          </p>
          <p className="subtitle-line block">
            Symmetrical custom engineering is our core standard.
          </p>
        </div>
      </div>

      {/* Scroll progress indicator */}
      <div ref={scrollProgressRef} className={`scroll-progress fixed right-8 bottom-8 z-20 flex items-center gap-4 font-mono text-[9px] tracking-widest text-zinc-500 uppercase transition-opacity duration-705 ${
        isVisible ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`} style={{ visibility: 'hidden' }}>
        <div className="scroll-text">SCROLL</div>
        <div className="progress-track w-16 h-px bg-zinc-800 relative">
          <div 
            className="progress-fill absolute left-0 top-0 h-px bg-white transition-all duration-100" 
            style={{ width: `${scrollProgress * 100}%` }}
          />
        </div>
        <div className="section-counter">
          {String(currentSection + 1).padStart(2, '0')} / {String(totalSections + 1).padStart(2, '0')}
        </div>
      </div>

      {/* Scroll sections that define page height */}
      <div className="scroll-sections relative w-full h-full z-10 pointer-events-none">
       {[...Array(2)].map((_, i) => {
          const titles: Record<number, string> = {
            0: 'REFUSAL',
            1: 'PERFORMANCE',
            2: 'OWNERSHIP'
          };
          
          const subtitles: Record<number, { line1: string; line2: string }> = {
            0: {
              line1: 'We refuse bloated plug-ins and pre-built templates.',
              line2: 'Symmetrical custom engineering is our core standard.'
            },
            1: {
              line1: 'Page load speeds are not a vanity metric.',
              line2: 'High-speed, edge-rendered platforms are prioritized first.'
            },
            2: {
              line1: 'We hand over 100% of the codebase from day one.',
              line2: 'Zero subscription lock-ins, complete independence.'
            }
          };
          
          const activeIndex = i + 1;
          const isActive = currentSection === activeIndex;
          
          return (
            <section 
              key={i} 
              className={`content-section absolute inset-0 flex flex-col justify-center items-center text-center px-6 transition-all duration-700 ${
                isVisible && isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-24"
              }`}
            >
              <h1 className="hero-title font-display font-black text-fluid-hero leading-none uppercase tracking-tighter text-white">
                {titles[activeIndex] || 'DEFAULT'}
              </h1>
          
              <div className="hero-subtitle cosmos-subtitle mt-6 space-y-2 text-zinc-400 font-sans text-xs sm:text-sm max-w-md">
                <p className="subtitle-line block">
                  {subtitles[activeIndex].line1}
                </p>
                <p className="subtitle-line block">
                  {subtitles[activeIndex].line2}
                </p>
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
};
