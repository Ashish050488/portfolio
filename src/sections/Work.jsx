import { useRef, useState } from 'react'
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion'
import { FiArrowUpRight, FiGithub } from 'react-icons/fi'
import { PROJECTS } from '../data'
import { MOCKS } from '../components/Mockups'

function Project({ p, i }) {
  const ref = useRef(null)
  const active = useInView(ref, { amount: .25 })
  const [tab, setTab] = useState('problem')
  const rx = useSpring(useMotionValue(0), { stiffness: 120, damping: 18 })
  const ry = useSpring(useMotionValue(0), { stiffness: 120, damping: 18 })
  const Mock = MOCKS[p.id]

  const tilt = e => {
    const r = e.currentTarget.getBoundingClientRect()
    ry.set(((e.clientX - r.left) / r.width - .5) * 10)
    rx.set(-((e.clientY - r.top) / r.height - .5) * 10)
  }
  const reset = () => { rx.set(0); ry.set(0) }

  return (
    <motion.article ref={ref} className="proj"
      initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .15 }} transition={{ duration: .9, ease: [0.16, 1, 0.3, 1] }}>
      <div className="proj-stage" onMouseMove={tilt} onMouseLeave={reset} style={{ perspective: 1000 }}>
        <div className="glow" style={{ background: p.hue }} />
        <motion.div style={{ rotateX: rx, rotateY: ry, width: '100%', display: 'grid', placeItems: 'center' }}>
          <Mock active={active} />
        </motion.div>
      </div>
      <div className="proj-body">
        <div className="proj-top mono">
          <span>{String(i + 1).padStart(2, '0')} — {p.year}</span>
          {i < 3 && <span className="live-dot"><span className="pulse" /> in production</span>}
        </div>
        <div>
          <h3>{p.name}</h3>
          <div className="kind">{p.kind}</div>
        </div>
        <p className="blurb">{p.blurb}</p>
        <div>
          <div className="tabs" role="tablist">
            {['problem', 'approach', 'impact'].map(k => (
              <button key={k} role="tab" aria-selected={tab === k} className={tab === k ? 'on' : ''} onClick={() => setTab(k)}>{k}</button>
            ))}
          </div>
          <motion.p key={tab} className="tab-body" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} style={{ paddingTop: 14 }}>{p.study[tab]}</motion.p>
        </div>
        <div className="tags" style={{ marginTop: 0 }}>{p.stack.map(s => <span className="tag" key={s}>{s}</span>)}</div>
        <div className="proj-links">
          <a className="btn solid" href={p.live} target="_blank" rel="noopener noreferrer">Visit site <FiArrowUpRight /></a>
          {p.code && <a className="btn" href={p.code} target="_blank" rel="noopener noreferrer"><FiGithub /> Code</a>}
        </div>
      </div>
    </motion.article>
  )
}

export default function Work() {
  return (
    <section className="section" id="work">
      <div className="wrap">
        <div className="eyebrow"><b>01</b> Selected work</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 24, flexWrap: 'wrap', marginTop: 18 }}>
          <h2 className="h-display h2">Things I built<br />that are <span className="accent">live.</span></h2>
          <p className="lede" style={{ maxWidth: '38ch' }}>Five products with real traffic. Each demo below is a working miniature of what the product does.</p>
        </div>
        <div className="work-list">
          {PROJECTS.map((p, i) => <Project key={p.id} p={p} i={i} />)}
        </div>
      </div>
    </section>
  )
}
