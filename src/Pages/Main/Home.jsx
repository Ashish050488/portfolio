import React from 'react'
import { motion, useScroll, useSpring } from 'framer-motion' // eslint-disable-line no-unused-vars
import Hero from '../Hero'
import Project from '../Project'
import TechStack from '../Techstack'
import Getintouch from './Getintouch'
import Footer from './Footer'
import Experience from '../Experience'
import AmbientEdges from '../../components/AmbientEdges'
import ThemeToggle from '../../components/ThemeToggle'

const SectionDivider = () => (
  <div className="section-divider" aria-hidden="true">
    <span className="block w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-gray-700" />
  </div>
)

const Home = () => {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })

  return (
    <div className='relative w-full'>
      <AmbientEdges />
      <ThemeToggle />
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-black dark:bg-white origin-left z-50"
        style={{ scaleX }}
        aria-hidden="true"
      />
      <div className="relative z-10">
        <Hero/>
        <SectionDivider />
        <Experience/>
        <SectionDivider />
        <Project/>
        <SectionDivider />
        <TechStack/>
        <SectionDivider />
        <Getintouch/>
      </div>
      <Footer/>
    </div>
  )
}

export default Home
