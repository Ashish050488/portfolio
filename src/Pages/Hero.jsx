import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Particles from '../Effect/Animation';
import { motion, AnimatePresence } from 'framer-motion';
import Comp from '../components/Comp';

const Hero = () => {
  const [hover, setHover] = useState(false);

  return (
    <div className="flex gap-25 justify-center mt-5">
      <div>
        <Comp/>
      </div>

      <div className="w-120 flex flex-col justify-center gap-4">
        <h1 className="text-5xl font-extrabold">Hi, I'm Ashish</h1>
        <h1 className="text-5xl font-extrabold">Ranjan</h1>
        <h1 className="text-xl font-extralight">I build sleek, scalable web application</h1>

        <div>
          <Link to="/">
            <div
              className="relative w-full h-12 overflow-hidden rounded-4xl bg-black cursor-pointer"
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
            >
              {/* Animated particles fade in/out */}
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

              {/* Text always visible */}
              <div className="absolute inset-0 z-10 flex items-center justify-center">
                <p className="px-4 py-4 text-white">View My Work</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
