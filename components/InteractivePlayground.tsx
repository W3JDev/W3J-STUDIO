import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCursor } from '../App';

interface Point {
  x: number;
  y: number;
  age: number;
}

// Subtle Particle Background Component
const ParticleBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      hueOffset: number;
    }

    const particles: Particle[] = [];

    const resize = () => {
      if (canvas.parentElement) {
        width = canvas.width = canvas.parentElement.clientWidth;
        height = canvas.height = canvas.parentElement.clientHeight;
      }
      // Re-init particles on resize for density control
      particles.length = 0;
      const count = Math.floor((width * height) / 20000); // Density
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.5, // Slow drift
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 2 + 0.5,
          hueOffset: Math.random() * 360
        });
      }
    };

    window.addEventListener('resize', resize);
    resize();

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      const time = Date.now() * 0.001;

      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around screen
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Dynamic Color Shift
        const hue = (p.hueOffset + time * 20) % 360;
        const opacity = 0.3 + Math.sin(time + p.x * 0.01) * 0.2; // Pulse

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${hue}, 70%, 60%, ${opacity})`;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-[1] mix-blend-screen" />;
};

export const InteractivePlayground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { setCursorVariant } = useCursor();
  const pointsRef = useRef<Point[]>([]);
  const mouseRef = useRef<{x: number, y: number} | null>(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const resize = () => {
      if (containerRef.current) {
        canvas.width = containerRef.current.clientWidth;
        canvas.height = containerRef.current.clientHeight;
      }
    };

    window.addEventListener('resize', resize);
    resize();

    const animate = () => {
      // Use destination-out to fade existing pixels to transparency
      // This reveals the animated CSS background underneath
      ctx.save();
      ctx.globalCompositeOperation = 'destination-out';
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'; 
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.restore();

      // Add new point if mouse is active
      if (mouseRef.current) {
        pointsRef.current.push({ 
          x: mouseRef.current.x, 
          y: mouseRef.current.y, 
          age: 0 
        });
      }

      // Draw points
      ctx.lineWidth = 2;
      ctx.lineCap = 'round';
      
      for (let i = 0; i < pointsRef.current.length; i++) {
        const p = pointsRef.current[i];
        const nextP = pointsRef.current[i + 1];

        if (nextP) {
            p.age++;
            // Chaotic colors based on position + time
            const time = Date.now() * 0.002;
            const r = Math.sin(p.x * 0.01 + time) * 127 + 128;
            const g = Math.sin(p.y * 0.01 + time + 2) * 127 + 128;
            const b = Math.sin(p.x * 0.01 + p.y * 0.01 + time + 4) * 127 + 128;
            
            ctx.beginPath();
            ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${1 - p.age / 40})`;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(nextP.x, nextP.y);
            ctx.stroke();
        }
      }

      // Remove old points
      pointsRef.current = pointsRef.current.filter(p => p.age < 40);

      requestAnimationFrame(animate);
    };

    const animId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animId);
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    mouseRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  };

  const handleMouseEnter = () => {
    setCursorVariant('text');
  };

  const handleMouseLeave = () => {
    mouseRef.current = null;
    setCursorVariant('default');
  };

  // Magnetic Button Logic
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [btnPos, setBtnPos] = useState({ x: 0, y: 0 });

  const handleButtonMouseMove = (e: React.MouseEvent) => {
    const btn = buttonRef.current;
    if(!btn) return;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setBtnPos({ x: x * 0.2, y: y * 0.2 }); // Magnetic strength
  };

  const handleButtonMouseLeave = () => {
    setBtnPos({ x: 0, y: 0 });
    setCursorVariant('default');
  };

  return (
    <section ref={containerRef} className="relative h-[90vh] w-full bg-black border-t border-white/10 flex flex-col items-center justify-center overflow-hidden">
      
      {/* Animated Background Layers */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          {/* Rotating Dark Gradient */}
          <motion.div 
            className="absolute inset-[-50%] opacity-40"
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            style={{
                background: "conic-gradient(from 90deg at 50% 50%, #000 0%, #0f172a 25%, #000 50%, #312e81 75%, #000 100%)",
                filter: "blur(60px)"
            }}
          />
          
          {/* Subtle Moving Noise/Orbs */}
          <motion.div 
            className="absolute inset-0 opacity-30 mix-blend-screen"
            animate={{ 
                backgroundPosition: ["0% 0%", "100% 100%"] 
            }}
            transition={{ 
                duration: 20, 
                repeat: Infinity, 
                repeatType: "mirror",
                ease: "easeInOut"
            }}
            style={{
                backgroundImage: "radial-gradient(circle at 50% 50%, #1e1b4b 0%, transparent 40%), radial-gradient(circle at 80% 20%, #0f766e 0%, transparent 30%)",
                backgroundSize: "120% 120%"
            }}
          />

          {/* Particle Background System */}
          <ParticleBackground />

          {/* Technical Grid Overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px] z-[2]" />
      </div>

      <canvas 
        ref={canvasRef}
        className="absolute inset-0 w-full h-full cursor-crosshair z-10"
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      />
      
      <div className="relative z-0 pointer-events-none text-center select-none mix-blend-exclusion px-4">
         <h2 className="text-6xl md:text-9xl font-bold text-white opacity-20 uppercase tracking-tighter">
           Initialize
         </h2>
         <p className="text-white opacity-50 tracking-widest uppercase mt-4">
           The void is listening.
         </p>
      </div>

      <AnimatePresence mode='wait'>
        {!showForm ? (
          <motion.button 
            ref={buttonRef}
            className="absolute bottom-32 z-20 px-12 py-6 border border-white text-white bg-black hover:bg-white hover:text-black transition-colors duration-300 uppercase font-bold tracking-[0.5em] text-sm"
            onMouseEnter={() => setCursorVariant('hover')}
            onMouseLeave={handleButtonMouseLeave}
            onMouseMove={handleButtonMouseMove}
            onClick={() => setShowForm(true)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, x: btnPos.x, y: btnPos.y }}
            exit={{ opacity: 0, scale: 0.5, filter: "blur(10px)" }}
            transition={{ type: "spring", stiffness: 150, damping: 15 }}
          >
            Start Project
          </motion.button>
        ) : (
          <motion.div 
            className="absolute inset-0 z-30 flex items-center justify-center bg-black/90 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
             <div className="w-full max-w-2xl p-12 border border-white/20 bg-black relative">
                {/* Fake Terminal Header */}
                <div className="absolute top-0 left-0 w-full h-8 bg-white/10 flex items-center px-4 gap-2">
                   <div className="w-3 h-3 rounded-full bg-red-500" />
                   <div className="w-3 h-3 rounded-full bg-yellow-500" />
                   <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>

                <form className="mt-8 space-y-8 font-mono" onSubmit={(e) => e.preventDefault()}>
                    <div className="group">
                       <label className="block text-xs uppercase tracking-widest text-white/50 mb-2 group-focus-within:text-white">Identity</label>
                       <input type="text" placeholder="Who are you?" className="w-full bg-transparent border-b border-white/20 py-2 text-xl focus:outline-none focus:border-white transition-colors" />
                    </div>
                    <div className="group">
                       <label className="block text-xs uppercase tracking-widest text-white/50 mb-2 group-focus-within:text-white">Objective</label>
                       <input type="text" placeholder="What do you seek?" className="w-full bg-transparent border-b border-white/20 py-2 text-xl focus:outline-none focus:border-white transition-colors" />
                    </div>
                    
                    <div className="flex justify-between items-center pt-8">
                        <button 
                          type="button"
                          onClick={() => setShowForm(false)}
                          className="text-xs uppercase tracking-widest opacity-50 hover:opacity-100"
                        >
                           [ Abort ]
                        </button>
                        <button 
                          className="px-8 py-3 bg-white text-black uppercase font-bold tracking-widest hover:bg-cyan-400 transition-colors"
                          onMouseEnter={() => setCursorVariant('hover')}
                          onMouseLeave={() => setCursorVariant('default')}
                        >
                           Transmit
                        </button>
                    </div>
                </form>
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};