import React from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import Hero from '../Hero'
import Project from '../Project'
import TechStack from '../Techstack'
import Getintouch from './Getintouch'
import Footer from './Footer'
import Experience from '../Experience'

const Home = () => {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })

  return (
    <div className='relative w-full'>
      {/* Scroll progress bar */}
      <motion.div
        className='fixed top-0 left-0 right-0 h-[2px] bg-black origin-left z-50'
        style={{ scaleX }}
      />
      <Hero/>
      <Experience/>
      <Project/>
      <TechStack/>
      <Getintouch/>
      <Footer/>
    </div>
  )
}

export default Home
