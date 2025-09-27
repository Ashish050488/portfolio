import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Particles from '../Effect/Animation';

const HoverButton = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link to="/">
      <div
        className="relative w-full h-12 overflow-hidden rounded-4xl bg-black z-0 cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Only show particles when hovered */}
        {isHovered && (
          <Particles
            particleColors={['#ffffff', '#ffffff']}
            particleCount={9000}
            particleSpread={50}
            speed={0.9}
            particleBaseSize={30}
            moveParticlesOnHover={true}
            alphaParticles={true}
            disableRotation={true}
          />
        )}

        <div className="absolute inset-0 z-10 flex items-center justify-center">
          <p className="px-4 py-4 text-white">View My Work</p>
        </div>
      </div>
    </Link>
  );
};

export default HoverButton;
