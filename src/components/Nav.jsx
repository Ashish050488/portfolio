import { useEffect, useState } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'

const ITEMS = [['work', 'Work'], ['impact', 'Impact'], ['experience', 'Experience'], ['stack', 'Stack']]

export default function Nav() {
  const [active, setActive] = useState('')
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })

  useEffect(() => {
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => e.isIntersecting && setActive(e.target.id))
    }, { rootMargin: '-45% 0px -50% 0px' })
    ITEMS.forEach(([id]) => { const el = document.getElementById(id); if (el) io.observe(el) })
    return () => io.disconnect()
  }, [])

  return (
    <>
      <motion.div className="progress" style={{ scaleX }} />
      <motion.nav className="nav" initial={{ y: -80, x: '-50%' }} animate={{ y: 0, x: '-50%' }} transition={{ duration: .9, delay: .4, ease: [0.16, 1, 0.3, 1] }}>
        <a href="#top" className="brand"><span className="pulse" /> AR</a>
        {ITEMS.map(([id, label]) => (
          <a key={id} href={`#${id}`} className={`hide-sm ${active === id ? 'on' : ''}`}>{label}</a>
        ))}
        <a href="#contact" className="cta">Say hello</a>
      </motion.nav>
    </>
  )
}
