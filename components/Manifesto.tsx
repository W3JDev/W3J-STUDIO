import React, { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import { useCursor } from '../App';

const text = "We do not build websites. We construct digital chaos. In a world of templates, we choose entropy. Design is not about comfort; it is about impact. We push the browser to its breaking point to find the art in the error.";

interface WordProps {
  children: React.ReactNode;
  range: [number, number];
  progress: MotionValue<number>;
}

const Word: React.FC<WordProps> = ({ children, range, progress }) => {
  // Animation: Scale up, fade in, blur out, slide up
  const opacity = useTransform(progress, range, [0, 1]);
  const scale = useTransform(progress, range, [0.5, 1]);
  const filter = useTransform(progress, range, ["blur(10px)", "blur(0px)"]);
  const y = useTransform(progress, range, [20, 0]);
  
  return (
    <motion.span 
      className="mr-3 mb-2 inline-block origin-bottom-left" 
      style={{ opacity, scale, filter, y }}
    >
      {children}
    </motion.span>
  );
};

export const Manifesto: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { setCursorVariant } = useCursor();
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.8", "end 0.6"]
  });

  const words = text.split(" ");

  return (
    <section 
      ref={containerRef} 
      className="min-h-[150vh] relative flex items-center justify-center py-20 bg-black overflow-hidden"
    >
      <div 
        className="max-w-5xl px-6 text-4xl md:text-6xl lg:text-7xl font-bold uppercase leading-tight tracking-tight text-center flex flex-wrap justify-center"
        onMouseEnter={() => setCursorVariant('hover')}
        onMouseLeave={() => setCursorVariant('default')}
      >
        {words.map((word, i) => {
          const start = i / words.length;
          const end = start + (1 / words.length);
          return (
            <Word key={i} progress={scrollYProgress} range={[start, end] as [number, number]}>
              {word}
            </Word>
          );
        })}
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 border border-white/20 rotate-45 opacity-30" />
      <div className="absolute bottom-20 right-10 w-32 h-1 bg-white/20 opacity-30" />
    </section>
  );
};