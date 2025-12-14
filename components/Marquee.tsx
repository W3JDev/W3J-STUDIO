import React from 'react';
import { motion } from 'framer-motion';

interface MarqueeProps {
  text: string;
  repeat?: number;
}

export const Marquee: React.FC<MarqueeProps> = ({ text, repeat = 4 }) => {
  return (
    <div className="relative flex overflow-hidden py-8 bg-white text-black border-y border-black">
      <motion.div 
        className="flex whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
      >
        {Array.from({ length: repeat }).map((_, i) => (
          <span key={i} className="text-8xl md:text-9xl font-bold uppercase tracking-tighter mx-8">
            {text} <span className="text-transparent stroke-text mx-4" style={{ WebkitTextStroke: '2px black' }}>{text}</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
};