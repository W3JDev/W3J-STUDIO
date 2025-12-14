import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Project } from '../types';
import { useCursor } from '../App';
import { ProjectCaseStudy } from './ProjectCaseStudy';
import { projects } from './SelectedWorks';

interface ProjectDetailProps {
  project: Project;
  onBack: () => void;
}

export const ProjectDetail: React.FC<ProjectDetailProps> = ({ project, onBack }) => {
  const { setCursorVariant } = useCursor();
  
  // Find next project for CTA
  const currentIndex = projects.findIndex(p => p.id === project.id);
  const nextProject = projects[(currentIndex + 1) % projects.length] || null;

  // Handle scroll reset when project changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [project.id]);

  const handleNext = (next: Project) => {
    // We need to bubble this up or hack it by forcing a re-render through a parent handler
    // Since App.tsx controls the state 'selectedProject', this component's props need to update.
    // Ideally, App.tsx passes a `onSelect` prop here too, but for now we can misuse `onBack` 
    // or we assume App.tsx needs to update. 
    // WAIT: App.tsx passes `onBack` but not `onSelect`. 
    // To strictly follow the component API in App.tsx, I should probably trigger something else.
    // However, since I can't easily modify App.tsx's render tree logic from here without changing App.tsx props...
    // I will assume for this specific task that I can't change App.tsx signature too much, 
    // BUT I can invoke a prop if I added it. 
    
    // To make this seamless, I should really just update the internal state if I could, 
    // but the state is lifted to App.tsx.
    // Let's assume I'll update App.tsx to pass a 'onChangeProject' prop.
    // But I see App.tsx is NOT in the change list for this step.
    // I will modify `ProjectDetail` to accept `onChangeProject` and update App.tsx.
    // Wait, I can change App.tsx. The prompt didn't forbid it.
    // Actually, I'll check if I can just use a callback.
    
    // HACK: For now, since I am replacing the content of ProjectDetail, I'll just expose the logic.
    // Let's look at App.tsx again.
    // App.tsx renders: <ProjectDetail key="project" project={selectedProject} onBack={handleBack} />
    // It doesn't pass a setter for selectedProject.
    // I MUST update App.tsx to support navigating between projects from within ProjectDetail.
    // I'll do that in a separate <change> block for App.tsx.
  };

  return (
    <motion.div 
      className="min-h-screen bg-black text-white relative z-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Sticky Nav Bar */}
      <div className="fixed top-0 left-0 w-full p-6 z-50 flex justify-between items-center mix-blend-difference pointer-events-none">
        <button 
          onClick={onBack}
          className="text-xl font-bold uppercase tracking-widest hover:opacity-50 transition-opacity pointer-events-auto cursor-none"
          onMouseEnter={() => setCursorVariant('hover')}
          onMouseLeave={() => setCursorVariant('default')}
        >
          ← Back
        </button>
        <span className="font-mono text-sm opacity-50">{project.id} // {project.category}</span>
      </div>

      {/* Render the Case Study Content */}
      {/* We need a way to trigger the next project. I'll add a prop `onChangeProject` to ProjectDetail interface 
          and pass it from App.tsx. */}
      <ProjectCaseStudy 
        project={project} 
        nextProject={nextProject} 
        onNext={(p) => {
            // This will be connected in App.tsx
            // For now, dispatch a custom event or expect a prop.
            // See App.tsx change below.
             const event = new CustomEvent('project-change', { detail: p });
             window.dispatchEvent(event);
        }} 
      />

    </motion.div>
  );
};