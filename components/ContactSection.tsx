import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCursor } from '../App';

export const ContactSection: React.FC = () => {
  const { setCursorVariant } = useCursor();
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    setTimeout(() => {
      setFormStatus('success');
    }, 1500);
  };

  return (
    <section className="relative min-h-screen bg-neutral-900 text-white pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12">
        
        {/* Sticky Header */}
        <div className="relative">
          <div className="sticky top-24">
            <motion.h2 
              className="text-7xl md:text-9xl font-bold uppercase tracking-tighter leading-none mb-8"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              Get In<br />Touch
            </motion.h2>
            <p className="text-sm font-mono uppercase tracking-widest opacity-50 max-w-xs leading-relaxed">
              We are currently accepting new challenges. If you have a project that requires breaking the internet, transmit your data.
            </p>
            
            <div className="mt-12 space-y-2 font-mono text-sm opacity-70">
              <p>London, UK</p>
              <p>+44 020 7123 4567</p>
              <p>hello@w3j.studio</p>
            </div>
          </div>
        </div>

        {/* Interactive Form */}
        <div className="relative pt-4 md:pt-24">
          <AnimatePresence mode="wait">
            {formStatus === 'success' ? (
              <motion.div 
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="min-h-[400px] flex flex-col items-center justify-center border border-white/20 bg-white/5 p-12 text-center"
              >
                <div className="text-6xl mb-4">✓</div>
                <h3 className="text-2xl font-bold uppercase tracking-widest mb-2">Transmission Received</h3>
                <p className="font-mono text-sm opacity-50">Our agents will contact you shortly.</p>
                <button 
                  onClick={() => setFormStatus('idle')}
                  className="mt-8 text-xs uppercase underline hover:text-cyan-400"
                >
                  Send another
                </button>
              </motion.div>
            ) : (
              <motion.form 
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="space-y-12"
              >
                {['Name', 'Email'].map((field) => (
                  <div key={field} className="group relative">
                    <label className="block text-xs font-mono uppercase tracking-widest opacity-50 mb-2 group-focus-within:opacity-100 group-focus-within:text-cyan-400 transition-colors">
                      {field}
                    </label>
                    <input 
                      type={field === 'Email' ? 'email' : 'text'} 
                      required
                      className="w-full bg-transparent border-b border-white/20 py-4 text-2xl md:text-3xl font-light focus:outline-none focus:border-cyan-400 transition-colors"
                      placeholder={`Enter your ${field.toLowerCase()}`}
                    />
                  </div>
                ))}
                
                <div className="group relative">
                  <label className="block text-xs font-mono uppercase tracking-widest opacity-50 mb-2 group-focus-within:opacity-100 group-focus-within:text-cyan-400 transition-colors">
                    Message
                  </label>
                  <textarea 
                    required
                    rows={4}
                    className="w-full bg-transparent border-b border-white/20 py-4 text-2xl md:text-3xl font-light focus:outline-none focus:border-cyan-400 transition-colors resize-none"
                    placeholder="Tell us about your project"
                  />
                </div>

                <div className="pt-8">
                   <button 
                     type="submit"
                     className="w-full py-6 border border-white bg-transparent hover:bg-white hover:text-black transition-all duration-300 uppercase font-bold tracking-[0.5em] text-sm relative overflow-hidden group"
                     onMouseEnter={() => setCursorVariant('hover')}
                     onMouseLeave={() => setCursorVariant('default')}
                   >
                     <span className="relative z-10 group-hover:mix-blend-difference">
                       {formStatus === 'submitting' ? 'Transmitting...' : 'Send Message'}
                     </span>
                     {/* Button Fill Effect */}
                     <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-0" />
                   </button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};