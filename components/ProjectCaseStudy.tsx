import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Project } from '../types';
import { useCursor } from '../App';

interface ProjectCaseStudyProps {
  project: Project;
  nextProject: Project | null;
  onNext: (project: Project) => void;
}

export const ProjectCaseStudy: React.FC<ProjectCaseStudyProps> = ({ project, nextProject, onNext }) => {
  const { setCursorVariant } = useCursor();
  const { scrollYProgress } = useScroll();
  
  // Parallax and effects for hero
  const y = useTransform(scrollYProgress, [0, 1], [0, 400]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.15]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.5]);

  return (
    <div className="w-full bg-black text-white">
      {/* Dynamic Hero Header */}
      <header className="relative h-screen w-full overflow-hidden">
        <motion.div className="absolute inset-0" style={{ y, scale, opacity }}>
          <img 
            src={project.image} 
            alt={project.name} 
            className="w-full h-full object-cover grayscale contrast-125" 
          />
          <div className="absolute inset-0 bg-black/30" />
          {/* Noise texture overlay for specific hero vibe */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjMDAwIiAvPgo8cmVjdCB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSIjMzMzIiAvPgo8L3N2Zz4=')] opacity-20 mix-blend-overlay" />
        </motion.div>
        
        <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 z-10">
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
          >
            <span className="block text-xs font-mono uppercase tracking-widest mb-4 text-cyan-400">
              Case Study // {project.id}
            </span>
            <h1 className="text-6xl md:text-9xl font-bold uppercase leading-[0.8] tracking-tighter mix-blend-difference">
              {project.name}
            </h1>
          </motion.div>
        </div>
      </header>

      {/* Content Grid */}
      <section className="max-w-[1600px] mx-auto px-6 py-24 md:py-32 grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24">
        
        {/* Sidebar / Metadata */}
        <div className="md:col-span-3">
          <div className="sticky top-32 space-y-12">
            <motion.div
               initial={{ opacity: 0, x: -20 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               transition={{ delay: 0.2 }}
            >
                <h3 className="text-xs font-mono uppercase tracking-widest mb-4 opacity-50">Client</h3>
                <p className="text-xl font-bold">{project.client || 'Unknown'}</p>
            </motion.div>

            <motion.div
               initial={{ opacity: 0, x: -20 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               transition={{ delay: 0.3 }}
            >
                <h3 className="text-xs font-mono uppercase tracking-widest mb-4 opacity-50">Services</h3>
                <ul className="text-sm space-y-2 font-mono">
                  {project.services?.map((s, i) => (
                    <li key={i} className="border-l border-white/20 pl-3">{s}</li>
                  )) || <li>N/A</li>}
                </ul>
            </motion.div>

            <motion.div
               initial={{ opacity: 0, x: -20 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               transition={{ delay: 0.4 }}
            >
                <h3 className="text-xs font-mono uppercase tracking-widest mb-4 opacity-50">Year</h3>
                <p className="text-sm font-mono">{project.year || '202X'}</p>
            </motion.div>
          </div>
        </div>

        {/* Main Content */}
        <div className="md:col-span-8 md:col-start-5 space-y-24">
           
           {/* Concept */}
           <motion.div
             initial={{ y: 50, opacity: 0 }}
             whileInView={{ y: 0, opacity: 1 }}
             viewport={{ once: true }}
           >
             <h2 className="text-3xl md:text-5xl font-bold leading-tight uppercase mb-8">
               Concept
             </h2>
             <p className="text-xl md:text-2xl opacity-80 leading-relaxed font-light">
               {project.description || 'Project description unavailable.'}
             </p>
           </motion.div>

           {/* Gallery Grid */}
           {project.gallery && project.gallery.length > 0 && (
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {project.gallery.map((img, i) => (
                  <motion.div 
                    key={i} 
                    className={`relative ${i % 3 === 0 ? 'md:col-span-2' : ''}`}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-10%" }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <img 
                      src={img} 
                      alt={`Gallery ${i}`} 
                      className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-700" 
                    />
                  </motion.div>
                ))}
             </div>
           )}

           {/* Challenge & Solution */}
           <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-12 border-t border-white/10">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                <h3 className="text-xl font-bold uppercase mb-4 text-red-500">The Glitch (Challenge)</h3>
                <p className="opacity-70 leading-relaxed">
                  {project.challenge || 'The challenge was strictly confidential.'}
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <h3 className="text-xl font-bold uppercase mb-4 text-cyan-400">The Patch (Solution)</h3>
                <p className="opacity-70 leading-relaxed">
                  {project.solution || 'The solution involved breaking the rules.'}
                </p>
              </motion.div>
           </div>

        </div>
      </section>

      {/* Next Project CTA */}
      {nextProject && (
        <section 
          className="py-32 md:py-48 bg-white text-black text-center overflow-hidden relative group cursor-none" 
          onClick={() => onNext(nextProject)}
          onMouseEnter={() => setCursorVariant('text')}
          onMouseLeave={() => setCursorVariant('default')}
        >
           <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
           
           <h3 className="text-xs font-mono uppercase tracking-widest mb-4 relative z-10">Next Case Study</h3>
           <h2 className="text-5xl md:text-9xl font-bold uppercase tracking-tighter relative z-10 mix-blend-exclusion group-hover:scale-105 transition-transform duration-500">
             {nextProject.name}
           </h2>

           <motion.div 
             className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-[10rem] md:text-[20rem] font-bold opacity-5 pointer-events-none whitespace-nowrap uppercase select-none"
             animate={{ x: ["-25%", "25%"] }}
             transition={{ repeat: Infinity, duration: 15, ease: "linear", repeatType: "mirror" }}
           >
             {nextProject.name} {nextProject.name}
           </motion.div>
        </section>
      )}
    </div>
  );
};