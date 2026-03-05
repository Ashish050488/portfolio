import React, { useState, useEffect } from 'react';
import Particles from '../Effect/Animation';
import { motion, AnimatePresence } from 'framer-motion';
import Comp from '../components/Comp';

const roles = [
  "I build sleek, scalable web applications",
  "I craft modern fullstack experiences",
  "I turn ideas into production-ready code",
];

const Hero = () => {
  const [hover, setHover] = useState(false);
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // 1. Create a function to handle the scroll
  const handleScroll = () => {
    const section = document.getElementById('projects');
    if (section) {
      // 2. Use scrollIntoView with 'smooth' behavior
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="flex flex-col md:flex-row gap-10 md:gap-25 justify-center items-center mt-5 px-4 min-h-[80vh] bg-white dark:bg-neutral-950">
      <div>
        <Comp />
      </div>

      <div className="w-full md:w-120 flex flex-col justify-center items-center md:items-start gap-4">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center md:text-left text-black dark:text-white">Hi, I'm Ashish</h1>
        <h1 className="text-4xl md:text-5xl font-extrabold text-center md:text-left text-black dark:text-white">Ranjan</h1>
        <div className="h-7 md:h-8 relative w-full">
          <AnimatePresence mode="wait">
            <motion.p
              key={roleIndex}
              className="text-lg md:text-xl font-extralight text-center md:text-left absolute w-full text-black dark:text-gray-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              {roles[roleIndex]}
            </motion.p>
          </AnimatePresence>
        </div>

        <button
          type="button"
          onClick={handleScroll}
          className="w-full max-w-xs md:max-w-none cursor-pointer"
          aria-label="Scroll to projects section"
        >
          <div
            className="relative w-full h-12 overflow-hidden rounded-4xl bg-black dark:bg-white"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          >
            <AnimatePresence>
              {hover && (
                <motion.div
                  className="absolute inset-0 z-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, ease: 'easeInOut' }}
                >
                  <Particles
                    particleColors={['#ffffff', '#ffffff']}
                    particleCount={9000}
                    particleSpread={40}
                    speed={0.9}
                    particleBaseSize={30}
                    moveParticlesOnHover={true}
                    alphaParticles={true}
                    disableRotation={true}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <div className="absolute inset-0 z-10 flex items-center justify-center">
              <span className="px-4 py-4 text-white dark:text-black">View My Work</span>
            </div>
          </div>
        </button>
      </div>
    </section>
  );
};

export default Hero;