import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 2000; // 2 seconds total load time
    const steps = 20;
    const intervalTime = duration / steps;

    const interval = setInterval(() => {
      setCount((prev) => {
        const next = prev + Math.floor(Math.random() * 10) + 5;
        if (next >= 100) {
          clearInterval(interval);
          return 100;
        }
        return next;
      });
    }, intervalTime);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (count >= 100) {
      const timer = setTimeout(() => {
        onComplete();
      }, 500); // Wait a bit after reaching 100%
      return () => clearTimeout(timer);
    }
  }, [count, onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] bg-black text-white flex flex-col items-center justify-center overflow-hidden"
      exit={{ y: '-100%', transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
    >
      <div className="relative">
        <motion.h1 
          className="text-9xl md:text-[12rem] font-bold font-mono tracking-tighter"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {count}%
        </motion.h1>
        
        <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20">
          <motion.div 
            className="h-full bg-white"
            style={{ width: `${count}%` }}
          />
        </div>
      </div>

      <div className="absolute bottom-10 left-10 font-mono text-xs uppercase tracking-widest flex flex-col gap-1">
        <span>System: Initializing...</span>
        <span>Memory: {count * 124}MB OK</span>
        <span>Distortion: Active</span>
      </div>
    </motion.div>
  );
};