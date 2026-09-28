import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion'

const ease = [0.76, 0, 0.24, 1]

// Intro: a manga chapter title card, then it slides away.
export function Loader({ onDone }) {
  const [n, setN] = useState(0)
  const [gone, setGone] = useState(false)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setGone(true); onDone(); return }
    let raf
    const start = performance.now(), dur = 1300
    const tick = now => {
      const p = Math.min(1, (now - start) / dur)
      setN(p)
      if (p < 1) raf = requestAnimationFrame(tick)
      else setTimeout(() => { setGone(true); onDone() }, 300)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [onDone])
  return (
    <AnimatePresence>
      {!gone && (
        <motion.div className="loader" exit={{ clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)' }} initial={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }} transition={{ duration: .8, ease }}>
          <div>
            <div className="ch">CHAPTER 01</div>
            <motion.div className="tt" initial={{ scale: 1.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', stiffness: 200, damping: 16 }}>ASHISH<br />RANJAN</motion.div>
            <div className="jp">アシシュ・ランジャン</div>
            <div className="bar"><i style={{ transform: `scaleX(${n})` }} /></div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Pulls toward the pointer while hovered, springs back on leave.
export function Magnetic({ children, strength = .35, className, ...rest }) {
  const ref = useRef(null)
  const x = useSpring(useMotionValue(0), { stiffness: 180, damping: 14, mass: .4 })
  const y = useSpring(useMotionValue(0), { stiffness: 180, damping: 14, mass: .4 })
  const move = e => {
    const r = ref.current.getBoundingClientRect()
    x.set((e.clientX - (r.left + r.width / 2)) * strength)
    y.set((e.clientY - (r.top + r.height / 2)) * strength)
  }
  const leave = () => { x.set(0); y.set(0) }
  return (
    <motion.span ref={ref} className={`magnetic ${className || ''}`} style={{ x, y }} onPointerMove={move} onPointerLeave={leave} {...rest}>
      {children}
    </motion.span>
  )
}

// Lines slide up from behind a mask when they scroll into view. The visible mask is what
// gets observed: the hidden line itself is clipped, so it would never register as in view.
export function Reveal({ lines, as: Tag = 'h2', className, delay = 0 }) {
  return (
    <Tag className={className}>
      {lines.map((l, i) => (
        <motion.span className="mask" key={i} initial="off" whileInView="on" viewport={{ once: true, amount: .3 }}>
          <motion.span style={{ display: 'block' }}
            variants={{ off: { y: '105%' }, on: { y: 0, transition: { duration: 1, delay: delay + i * .08, ease: [0.16, 1, 0.3, 1] } } }}>{l}</motion.span>
        </motion.span>
      ))}
    </Tag>
  )
}

export function Marquee({ items }) {
  const row = [...items, ...items]
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {row.map((t, i) => <span key={i}>{t}<i>✳</i></span>)}
      </div>
    </div>
  )
}

export function Clock() {
  const fmt = () => new Date().toLocaleTimeString('en-GB', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit' })
  const [t, setT] = useState(fmt)
  useEffect(() => { const id = setInterval(() => setT(fmt()), 10000); return () => clearInterval(id) }, [])
  return <span className="clock">Bengaluru {t}</span>
}
