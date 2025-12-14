import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';
import { useCursor } from '../App';

export const CursorFollower: React.FC = () => {
  const { cursorVariant } = useCursor();
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth spring animation for the cursor movement
  const springConfig = { damping: 25, stiffness: 200 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', moveCursor);
    return () => {
      window.removeEventListener('mousemove', moveCursor);
    };
  }, [mouseX, mouseY]);

  const variants = {
    default: {
      height: 24,
      width: 24,
      x: -12,
      y: -12,
      backgroundColor: '#fff',
      mixBlendMode: 'difference' as any,
    },
    hover: {
      height: 80,
      width: 80,
      x: -40,
      y: -40,
      backgroundColor: '#fff',
      mixBlendMode: 'difference' as any,
    },
    text: {
      height: 120,
      width: 120,
      x: -60,
      y: -60,
      backgroundColor: '#fff',
      mixBlendMode: 'difference' as any,
      opacity: 0.8
    }
  };

  return (
    <motion.div
      className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999]"
      style={{
        x,
        y,
      }}
      variants={variants}
      animate={cursorVariant}
      transition={{
        type: "spring",
        stiffness: 500,
        damping: 28
      }}
    >
        {/* Inner dot for precision */}
        <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-black rounded-full -translate-x-1/2 -translate-y-1/2" />
    </motion.div>
  );
};