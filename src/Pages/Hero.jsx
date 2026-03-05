import React, { useState, useEffect } from 'react';
import Particles from '../Effect/Animation';
import { motion, AnimatePresence } from 'framer-motion';
import Comp from '../components/Comp';

const roles = ["Software Engineer", "Full Stack Developer", "SaaS Builder"];

const Hero = () => {
  const [hover, setHover] = useState(false);
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const handleScroll = () => {
    const section = document.getElementById('projects');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-[85vh] flex flex-col md:flex-row gap-10 md:gap-20 justify-center items-center px-4 py-16">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <Comp />
      </motion.div>

      <div className="w-full md:w-[520px] flex flex-col justify-center items-center md:items-start gap-5">
        {/* Section label */}
        <motion.span
          className="text-xs tracking-[0.3em] uppercase text-gray-400 font-medium"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          01 — Introduction
        </motion.span>

        {/* Name */}
        <motion.h1
          className="text-5xl md:text-6xl font-extrabold text-black leading-tight text-center md:text-left"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          Hi, I'm Ashish
          <br />
          Ranjan
        </motion.h1>

        {/* Animated role cycling */}
        <div className="h-8 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.p
              key={roleIndex}
              className="text-lg md:text-xl font-light text-gray-500 text-center md:text-left"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              {roles[roleIndex]}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Summary */}
        <motion.p
          className="text-sm text-gray-400 leading-relaxed text-center md:text-left max-w-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          ~1 year of production experience building scalable web systems end-to-end.
          Strong across React, Node.js, PostgreSQL &amp; MongoDB.
        </motion.p>

        {/* Available badge */}
        <motion.div
          className="flex items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
          </span>
          <span className="text-xs text-gray-500 font-medium">Available for opportunities</span>
        </motion.div>

        {/* CTA Button */}
        <motion.a
          onClick={handleScroll}
          className="w-full max-w-xs md:max-w-[280px] cursor-pointer mt-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <div
            className="relative w-full h-12 overflow-hidden rounded-full bg-black"
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
              <p className="px-4 py-4 text-white text-sm font-medium tracking-wide">View My Work ↓</p>
            </div>
          </div>
        </motion.a>
      </div>
    </div>
  );
};

export default Hero;