import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { PROFILE } from '../data'

// Anime speed lines: thin ink wedges bursting from a focal point, redrawn a few times a
// second so they flicker like an action panel. The focus drifts toward the pointer.
function SpeedLines() {
  const ref = useRef(null)
  useEffect(() => {
    const cv = ref.current, ctx = cv.getContext('2d')
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let w = 0, h = 0, raf, last = 0, on = true
    let fx = .62, fy = .45, tx = fx, ty = fy
    const size = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = cv.clientWidth; h = cv.clientHeight
      cv.width = w * dpr; cv.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    const draw = () => {
      ctx.fillStyle = '#FBFBF8'; ctx.fillRect(0, 0, w, h)
      const cx = w * fx, cy = h * fy
      const R = Math.hypot(w, h)
      const inner = Math.min(w, h) * .26
      ctx.fillStyle = '#111'
      for (let i = 0; i < 150; i++) {
        const a = Math.random() * Math.PI * 2
        const spread = .002 + Math.random() * .012
        const r0 = inner * (.8 + Math.random() * .9)
        ctx.beginPath()
        ctx.moveTo(cx + Math.cos(a) * r0, cy + Math.sin(a) * r0)
        ctx.lineTo(cx + Math.cos(a - spread) * R, cy + Math.sin(a - spread) * R)
        ctx.lineTo(cx + Math.cos(a + spread) * R, cy + Math.sin(a + spread) * R)
        ctx.closePath(); ctx.fill()
      }
    }
    const loop = t => {
      raf = requestAnimationFrame(loop)
      if (!on) return
      fx += (tx - fx) * .08; fy += (ty - fy) * .08
      if (t - last > 90) { last = t; draw() }
    }
    const move = e => {
      const r = cv.getBoundingClientRect()
      tx = .5 + ((e.clientX - r.left) / r.width - .5) * .35
      ty = .45 + ((e.clientY - r.top) / r.height - .5) * .3
    }
    size(); draw()
    const ro = new ResizeObserver(() => { size(); draw() }); ro.observe(cv)
    const io = new IntersectionObserver(([e]) => { on = e.isIntersecting }); io.observe(cv)
    if (!reduce) { raf = requestAnimationFrame(loop); window.addEventListener('pointermove', move) }
    return () => { cancelAnimationFrame(raf); ro.disconnect(); io.disconnect(); window.removeEventListener('pointermove', move) }
  }, [])
  return <canvas ref={ref} aria-hidden="true" />
}

const ease = [0.16, 1, 0.3, 1]

export default function Hero({ ready }) {
  const go = ready ? 'on' : 'off'
  const v = {
    off: { y: '110%' },
    on: i => ({ y: 0, transition: { duration: 1, delay: .1 + i * .1, ease } }),
  }
  return (
    <section className="hero pad" id="top">
      <div className="hero-grid">
        <div className="panel hero-main">
          <SpeedLines />
          <div className="tone tone-fade" />
          <motion.span className="sfx" aria-hidden="true"
            initial={{ scale: 3, opacity: 0, rotate: 30 }} animate={ready ? { scale: 1, opacity: 1, rotate: 10 } : {}}
            transition={{ type: 'spring', stiffness: 260, damping: 14, delay: .55 }}>ドン!</motion.span>
          <motion.div className="hero-tag" initial={{ opacity: 0, x: -30 }} animate={ready ? { opacity: 1, x: 0 } : {}} transition={{ delay: .35, duration: .6, ease }}>
            <span className="red">●</span> Software Development Engineer · {PROFILE.company}
          </motion.div>
          <h1 className="hero-name">
            <span className="mask"><motion.span style={{ display: 'block' }} variants={v} custom={0} initial="off" animate={go}>Ashish</motion.span></span>
            <span className="mask"><motion.span style={{ display: 'block' }} className="out" variants={v} custom={1} initial="off" animate={go}>Ranjan</motion.span></span>
          </h1>
        </div>

        <motion.aside className="hero-side" initial={{ opacity: 0, x: 30 }} animate={ready ? { opacity: 1, x: 0 } : {}} transition={{ delay: .5, duration: .8, ease }}>
          <div className="bubble">I build the systems behind the screen.</div>
          <div className="panel dark vert jp" aria-label="Ashish Ranjan in katakana">アシシュ・ランジャン</div>
          <div className="panel side-box">
            <b>Bengaluru, India</b>
            Pipelines, syncs, payroll, and the security around them. Full-stack, production-first.
          </div>
        </motion.aside>
      </div>
    </section>
  )
}
