import { useEffect } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import Cursor     from '../../components/Cursor'
import Nav        from '../../components/Nav'
import Hero       from '../Hero'
import Experience from '../Experience'
import Project    from '../Project'
import TechStack  from '../Techstack'
import Getintouch from './Getintouch'
import Footer     from './Footer'

export default function Home() {
  useEffect(() => {
    const isDark = localStorage.getItem('theme') !== 'light'
    document.documentElement.classList.toggle('dark', isDark)
  }, [])

  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness:100, damping:30 })

  return (
    <div style={{ minHeight:'100vh', backgroundColor:'var(--bg)', color:'var(--fg)' }}>
      <Cursor />
      <motion.div className="scroll-bar" style={{ scaleX }} aria-hidden="true" />
      <Nav />
      <main>
        <Hero />
        <Experience />
        <Project />
        <TechStack />
        <Getintouch />
      </main>
      <Footer />
    </div>
  )
}
