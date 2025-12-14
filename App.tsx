import React, { createContext, useState, useContext, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NoiseOverlay } from './components/NoiseOverlay';
import { CursorFollower } from './components/CursorFollower';
import { LiquidHero } from './components/LiquidHero';
import { Manifesto } from './components/Manifesto';
import { SelectedWorks } from './components/SelectedWorks';
import { Services } from './components/Services';
import { InteractivePlayground } from './components/InteractivePlayground';
import { ProjectDetail } from './components/ProjectDetail';
import { Preloader } from './components/Preloader';
import { Marquee } from './components/Marquee';
import { ContactSection } from './components/ContactSection';
import { Project } from './types';

// Cursor Context
interface CursorContextType {
  cursorVariant: 'default' | 'hover' | 'text';
  setCursorVariant: (variant: 'default' | 'hover' | 'text') => void;
}

export const CursorContext = createContext<CursorContextType>({
  cursorVariant: 'default',
  setCursorVariant: () => {},
});

export const useCursor = () => useContext(CursorContext);

const App: React.FC = () => {
  const [cursorVariant, setCursorVariant] = useState<'default' | 'hover' | 'text'>('default');
  const [view, setView] = useState<'home' | 'project'>('home');
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const handleProjectSelect = (project: Project) => {
    setSelectedProject(project);
    setView('project');
  };

  const handleBack = () => {
    setView('home');
    setSelectedProject(null);
  };

  // Listen for project changes from detail view (hack for clean prop drilling without rewriting everything)
  useEffect(() => {
    const handleProjectChange = (e: Event) => {
      const customEvent = e as CustomEvent<Project>;
      handleProjectSelect(customEvent.detail);
      window.scrollTo(0,0);
    };

    window.addEventListener('project-change', handleProjectChange);
    return () => window.removeEventListener('project-change', handleProjectChange);
  }, []);

  return (
    <CursorContext.Provider value={{ cursorVariant, setCursorVariant }}>
      <main className="relative min-h-screen bg-black text-white selection:bg-white selection:text-black overflow-x-hidden">
        <NoiseOverlay />
        <CursorFollower />
        
        <AnimatePresence mode="wait">
          {loading && <Preloader key="preloader" onComplete={() => setLoading(false)} />}
        </AnimatePresence>
        
        {!loading && (
          <>
            {/* Enterprise Stamp / Brand Strip */}
            <div className="fixed top-0 left-0 w-full p-6 z-[60] mix-blend-difference pointer-events-none flex justify-between items-start">
               <div className="pointer-events-auto">
                   <h1 className="text-xs font-bold uppercase tracking-widest leading-none">
                     W3J STUDIO <span className="opacity-50 font-normal normal-case">by</span> <a href="https://w3jdev.com" target="_blank" rel="noopener noreferrer" className="hover:underline opacity-70 hover:opacity-100 transition-opacity">w3jdev</a>
                   </h1>
               </div>
            </div>

            <AnimatePresence mode="wait">
              {view === 'home' ? (
                <motion.div 
                  key="home"
                  className="relative z-10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <LiquidHero />
                  <Manifesto />
                  <Marquee text="CHAOS • EXPERIMENTAL • WEBGL • DESIGN •" />
                  <Services />
                  <SelectedWorks onSelect={handleProjectSelect} />
                  <InteractivePlayground />
                  <Marquee text="LETS BUILD SOMETHING WEIRD •" repeat={8} />
                  <ContactSection />
                  
                  <footer className="py-12 border-t border-white/10 text-center uppercase text-xs tracking-widest opacity-50 flex flex-col gap-2">
                    <p>W3J Studio © {new Date().getFullYear()} — We Break The Web</p>
                    <p className="opacity-70">
                       <a href="https://w3jdev.com" className="hover:text-white transition-colors">w3jdev</a> · 
                       <a href="https://github.com/w3jdev" className="hover:text-white transition-colors ml-2">Github</a> · 
                       <a href="https://linkedin.com/in/w3jdev" className="hover:text-white transition-colors ml-2">LinkedIn</a>
                    </p>
                  </footer>
                </motion.div>
              ) : (
                selectedProject && (
                  <ProjectDetail key={selectedProject.id} project={selectedProject} onBack={handleBack} />
                )
              )}
            </AnimatePresence>
          </>
        )}
      </main>
    </CursorContext.Provider>
  );
};

export default App;