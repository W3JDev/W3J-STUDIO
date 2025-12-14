import React from 'react';
import { motion } from 'framer-motion';
import { useCursor } from '../App';

const services = [
  { id: '01', title: 'Strategy', description: 'We define the chaos before we create it. Market analysis through the lens of entropy.' },
  { id: '02', title: 'Art Direction', description: 'Visual languages that speak in tongues. Aesthetics that hurt and heal.' },
  { id: '03', title: 'Development', description: 'Code that breaks the fourth wall. WebGL, shaders, and react-three-fiber mastery.' },
  { id: '04', title: 'Content', description: 'Stories told through distortion. Copywriting that refuses to be ignored.' },
];

export const Services: React.FC = () => {
  const { setCursorVariant } = useCursor();

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <section className="py-20 bg-black text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-12 border-b border-white/20 pb-4 flex justify-between items-end">
             <h2 className="text-xs font-mono uppercase tracking-widest">Our Arsenal</h2>
             <span className="text-xs font-mono uppercase tracking-widest">Global // Remote</span>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 border-l border-white/10"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          {services.map((service) => (
            <motion.div 
              key={service.id} 
              variants={itemVariants}
              className="group relative border-r border-b border-white/10 p-8 md:p-16 h-[400px] flex flex-col justify-between hover:bg-white hover:text-black transition-colors duration-500 overflow-hidden"
              onMouseEnter={() => setCursorVariant('hover')}
              onMouseLeave={() => setCursorVariant('default')}
            >
              <div className="flex justify-between items-start">
                <span className="font-mono text-xs tracking-widest opacity-50">({service.id})</span>
                <motion.span 
                  className="text-3xl transform group-hover:rotate-45 transition-transform duration-500"
                >
                  ↗
                </motion.span>
              </div>
              
              <div className="relative z-10">
                <h3 className="text-5xl md:text-6xl font-bold uppercase mb-6 tracking-tighter">
                  {service.title}
                </h3>
                <p className="font-mono text-sm max-w-xs opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 translate-y-4 group-hover:translate-y-0">
                  {service.description}
                </p>
              </div>

              {/* Glitch Background Effect on Hover */}
              <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out -z-10" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};