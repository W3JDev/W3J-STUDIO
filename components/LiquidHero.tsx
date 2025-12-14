import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Sphere, Environment } from '@react-three/drei';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import { useCursor } from '../App';

// The 3D Blob Component
const Blob = ({ scale = 1 }: { scale?: number }) => {
  const meshRef = useRef<THREE.Mesh>(null!);
  const materialRef = useRef<any>(null!);
  const [hovered, setHover] = useState(false);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    
    // Simulate Audio Reactivity / Chaos
    // We combine multiple sine waves to create a pseudo-random "beat"
    const bass = Math.sin(t * 3) * 0.5 + 0.5;
    const highHat = Math.cos(t * 12) * 0.3;
    const chaos = bass + highHat;

    if (meshRef.current) {
      // Rotate based on "energy"
      meshRef.current.rotation.x = t * 0.2 + (chaos * 0.1);
      meshRef.current.rotation.y = t * 0.3;
    }

    if (materialRef.current) {
        // Modulate distortion and speed based on simulated audio
        // Base distortion 0.6, adds up to 0.4 based on chaos
        materialRef.current.distort = 0.4 + (chaos * 0.5); 
        materialRef.current.speed = 2 + (chaos * 3);
        
        // Pulse color slightly
        const c = hovered ? new THREE.Color("#333") : new THREE.Color("#111");
        // Flash slightly on "beats"
        if (chaos > 0.8) c.add(new THREE.Color(0.1, 0.1, 0.1));
        materialRef.current.color.lerp(c, 0.1);
    }
  });

  return (
    <Sphere args={[1, 128, 128]} ref={meshRef} scale={scale} onPointerOver={() => setHover(true)} onPointerOut={() => setHover(false)}>
      <MeshDistortMaterial
        ref={materialRef}
        color="#111"
        attach="material"
        distort={0.6} 
        speed={2} 
        roughness={0.2}
        metalness={0.9}
      />
    </Sphere>
  );
};

export const LiquidHero: React.FC = () => {
  const { setCursorVariant } = useCursor();

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-black">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 4] }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <Environment preset="warehouse" />
          <Blob scale={1.8} />
        </Canvas>
      </div>

      {/* SVG Filter Definition for Text */}
      <svg className="absolute w-0 h-0">
        <defs>
          <filter id="displacementFilter">
            <feTurbulence 
              type="turbulence" 
              baseFrequency="0.01" 
              numOctaves="2" 
              result="turbulence" 
            >
              <animate attributeName="baseFrequency" values="0.01;0.02;0.01" dur="10s" repeatCount="indefinite" />
            </feTurbulence>
            <feDisplacementMap 
              in2="turbulence" 
              in="SourceGraphic" 
              scale="20" 
              xChannelSelector="R" 
              yChannelSelector="G" 
            />
          </filter>
        </defs>
      </svg>

      {/* Content */}
      <div className="relative z-10 text-center mix-blend-difference p-4">
        <motion.h1 
          className="text-8xl md:text-[10rem] font-bold leading-none tracking-tighter uppercase"
          onMouseEnter={() => setCursorVariant('text')}
          onMouseLeave={() => setCursorVariant('default')}
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          style={{ filter: 'url(#displacementFilter)' }}
        >
          We Break
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 via-purple-500 to-yellow-500 animate-gradient-x">
            The Web
          </span>
        </motion.h1>
        
        <motion.div 
          className="mt-8 text-sm md:text-base tracking-[0.5em] uppercase opacity-70"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ delay: 1, duration: 1 }}
        >
          Brutalist • Kinetic • Experimental
        </motion.div>
      </div>
      
      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-xs uppercase tracking-widest opacity-50"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        Scroll to Disintegrate
      </motion.div>
    </section>
  );
};