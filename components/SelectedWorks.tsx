import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { useCursor } from '../App';
import { Project } from '../types';

export const projects: Project[] = [
  { 
    id: '01', 
    name: 'Project Alpha', 
    category: 'WebGL Experience', 
    image: 'https://picsum.photos/600/400?random=1',
    client: 'Alpha Industries',
    year: '2024',
    services: ['Creative Direction', 'WebGL', 'Sound Design'],
    description: 'A purely experimental journey into the void. Project Alpha challenges the user\'s perception of digital space through recursive geometry and audio-reactive visuals.',
    challenge: 'The client needed a way to visualize "infinite data" without crashing the browser. Standard DOM elements were insufficient for the required particle count.',
    solution: 'We built a custom GLSL shader pipeline in React Three Fiber, allowing for 100k+ interactive particles while maintaining 60fps on mobile devices.',
    gallery: [
      'https://picsum.photos/800/600?random=11',
      'https://picsum.photos/800/600?random=12',
      'https://picsum.photos/800/600?random=13'
    ]
  },
  { 
    id: '02', 
    name: 'Neon Genesis', 
    category: 'E-Commerce', 
    image: 'https://picsum.photos/600/400?random=2',
    client: 'Future Wear',
    year: '2023',
    services: ['UI/UX', 'Shopify Headless', '3D Modeling'],
    description: 'Redefining streetwear culture with a storefront that feels like a cyberpunk terminal. Neon Genesis is not just a shop; it is a digital artifact.',
    challenge: 'Traditional e-commerce layouts convert well but lack soul. The brand needed to alienate the normies and attract the avant-garde.',
    solution: 'A navigational system based on hacking mechanics. Users must "decrypt" product drops to purchase them, creating viral scarcity.',
    gallery: [
      'https://picsum.photos/800/600?random=21',
      'https://picsum.photos/800/600?random=22'
    ]
  },
  { 
    id: '03', 
    name: 'Void Walker', 
    category: 'Brand Identity', 
    image: 'https://picsum.photos/600/400?random=3',
    client: 'Null Corp',
    year: '2024',
    services: ['Branding', 'Motion Graphics', 'Strategy'],
    description: 'Identity design for a stealth startup operating in the crypto-security space. The visual language mimics redacted documents and corrupted data streams.',
    gallery: [
      'https://picsum.photos/800/600?random=31',
      'https://picsum.photos/800/600?random=32',
      'https://picsum.photos/800/600?random=33'
    ]
  },
  { 
    id: '04', 
    name: 'Cyber Soul', 
    category: 'Immersive Audio', 
    image: 'https://picsum.photos/600/400?random=4',
    client: 'Sonar Collective',
    year: '2023',
    services: ['Audio Engineering', 'Frontend Dev'],
    description: 'A spatial audio experience that changes based on the user\'s mouse velocity and scroll speed.',
    gallery: [
      'https://picsum.photos/800/600?random=41'
    ]
  },
  { 
    id: '05', 
    name: 'Data Mosh', 
    category: 'Dashboard', 
    image: 'https://picsum.photos/600/400?random=5',
    client: 'FinTech Global',
    year: '2024',
    services: ['Data Viz', 'React'],
    description: 'Making financial data look like a glitch art masterpiece. Who said spreadsheets have to be boring?',
    gallery: [
      'https://picsum.photos/800/600?random=51',
      'https://picsum.photos/800/600?random=52'
    ]
  },
];

interface SelectedWorksProps {
  onSelect: (project: Project) => void;
}

export const SelectedWorks: React.FC<SelectedWorksProps> = ({ onSelect }) => {
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const { setCursorVariant } = useCursor();
  
  // Mouse position for the floating image
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  // Smooth spring for the image lag effect
  const springConfig = { stiffness: 150, damping: 15 };
  const xSpring = useSpring(x, springConfig);
  const ySpring = useSpring(y, springConfig);

  // Trail state
  const [trail, setTrail] = useState<{x: number, y: number, id: number}[]>([]);
  const lastPosRef = useRef({x: 0, y: 0});
  const trailIdCounter = useRef(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    const clientX = e.clientX;
    const clientY = e.clientY;

    // Offset image to center on cursor (assuming 400x300 image)
    const targetX = clientX - 200;
    const targetY = clientY - 150;

    x.set(targetX);
    y.set(targetY);

    // Trail Logic: Add a ghost image every ~50px of movement
    if (activeProject) {
        const dist = Math.hypot(clientX - lastPosRef.current.x, clientY - lastPosRef.current.y);
        if (dist > 50) {
            trailIdCounter.current += 1;
            setTrail(prev => [
                { x: targetX, y: targetY, id: trailIdCounter.current },
                ...prev.slice(0, 4) // Keep last 5 ghost images
            ]);
            lastPosRef.current = { x: clientX, y: clientY };
        }
    }
  };

  return (
    <section 
      className="relative py-32 px-6 bg-neutral-900 text-white overflow-hidden"
      onMouseMove={handleMouseMove}
    >
       <div className="max-w-7xl mx-auto">
         <h2 className="text-xs font-mono mb-12 uppercase tracking-widest border-b border-white/20 pb-4">
           Selected Works (0{projects.length})
         </h2>
         
         <div className="flex flex-col">
            {projects.map((project) => (
              <div 
                key={project.id}
                className="group relative flex items-baseline justify-between border-b border-white/10 py-12 transition-colors hover:bg-white/5 cursor-none"
                onMouseEnter={() => {
                  setActiveProject(project);
                  setCursorVariant('hover');
                }}
                onMouseLeave={() => {
                  setActiveProject(null);
                  setCursorVariant('default');
                  setTrail([]); // Clear trail
                }}
                onClick={() => {
                  setCursorVariant('default');
                  onSelect(project);
                }}
              >
                 <div className="flex items-baseline gap-8 z-10 mix-blend-difference pointer-events-none">
                   <span className="text-sm font-mono text-white/40 group-hover:text-white/100 transition-colors">
                     {project.id}
                   </span>
                   <h3 className="text-5xl md:text-7xl font-bold uppercase tracking-tighter transition-all duration-300 group-hover:translate-x-4">
                     {project.name}
                   </h3>
                 </div>
                 <span className="hidden md:block text-xs font-mono uppercase tracking-widest z-10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                   {project.category}
                 </span>
              </div>
            ))}
         </div>
       </div>

       {/* Floating Image & Trail Reveal */}
       <AnimatePresence>
         {activeProject && (
           <>
             {/* Trail Images (Ghosts) */}
             {trail.map((t, i) => (
                 <motion.div
                    key={t.id}
                    className="fixed top-0 left-0 pointer-events-none z-10 overflow-hidden hidden md:block"
                    style={{ left: t.x, top: t.y, width: 400, height: 300 }}
                    initial={{ opacity: 0.3, scale: 0.95 }}
                    animate={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                 >
                    <img
                       src={activeProject.image}
                       alt=""
                       className="w-full h-full object-cover filter grayscale blur-sm"
                    />
                 </motion.div>
             ))}

             {/* Main Floating Image */}
             <motion.div
               className="fixed top-0 left-0 pointer-events-none z-20 overflow-hidden hidden md:block"
               style={{ x: xSpring, y: ySpring, width: 400, height: 300 }}
               initial={{ opacity: 0, scale: 0.8 }}
               animate={{ opacity: 1, scale: 1 }}
               exit={{ opacity: 0, scale: 0.8 }}
               transition={{ duration: 0.2 }}
             >
               <motion.img
                 src={activeProject.image}
                 alt={activeProject.name}
                 className="w-full h-full object-cover filter grayscale contrast-125"
                 initial={{ scale: 1.2 }}
                 animate={{ scale: 1 }}
                 transition={{ duration: 0.4 }}
               />
               {/* Holographic overlay */}
               <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/30 to-purple-500/30 mix-blend-overlay" />
               
               {/* Scanline effect */}
               <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px] opacity-20 pointer-events-none" />
             </motion.div>
           </>
         )}
       </AnimatePresence>
    </section>
  );
};