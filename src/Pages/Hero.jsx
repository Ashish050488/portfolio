import React, { useState } from 'react';
// You no longer need 'Link' from react-router-dom for this button
// import { Link } from 'react-router-dom'; 
import Particles from '../Effect/Animation';
import { motion, AnimatePresence } from 'framer-motion';
import Comp from '../components/Comp';

const Hero = () => {
  const [hover, setHover] = useState(false);

  // 1. Create a function to handle the scroll
  const handleScroll = () => {
    const section = document.getElementById('projects');
    if (section) {
      // 2. Use scrollIntoView with 'smooth' behavior
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-10 md:gap-25 justify-center items-center mt-5 px-4">
      <div>
        <Comp />
      </div>

      <div className="w-full md:w-120 flex flex-col justify-center items-center md:items-start gap-4">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center md:text-left">Hi, I'm Ashish</h1>
        <h1 className="text-4xl md:text-5xl font-extrabold text-center md:text-left">Ranjan</h1>
        <h1 className="text-lg md:text-xl font-extralight text-center md:text-left">I build sleek, scalable web application</h1>

        {/* 3. Replace <Link> with a tag that uses the onClick handler */}
        {/* We use an <a> tag here for semantics, but a <button> or <div> would also work. */}
        <a 
          onClick={handleScroll} 
          className="w-full max-w-xs md:max-w-none cursor-pointer"
        >
          <div
            className="relative w-full h-12 overflow-hidden rounded-4xl bg-black"
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
              <p className="px-4 py-4 text-white">View My Work</p>
            </div>
          </div>
        </a>
      </div>
    </div>
  );
};

export default Hero;