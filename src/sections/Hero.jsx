import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { FiArrowDownRight, FiArrowUpRight } from 'react-icons/fi'
import Backdrop from '../components/Backdrop'
import { PROFILE } from '../data'
import Resume from '../assets/Ashish_Ranjan_SWE_Resume.pdf'

const ease = [0.16, 1, 0.3, 1]
const LINES = [['I build software'], ['that keeps ', <span key="r" className="accent">running.</span>]]

function useClock() {
  const fmt = () => new Date().toLocaleTimeString('en-GB', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', second: '2-digit' })
  const [t, setT] = useState(fmt)
  useEffect(() => { const id = setInterval(() => setT(fmt()), 1000); return () => clearInterval(id) }, [])
  return t
}

// A heartbeat trace: uptime, drawn as an ECG line that never flatlines.
function Ekg() {
  const beat = 'l 40 0 l 8 -4 l 8 4 l 12 0 l 6 10 l 8 -38 l 8 46 l 6 -18 l 14 0 l 10 -6 l 10 6'
  const d = 'M 0 30 ' + Array.from({ length: 8 }, () => beat).join(' ')
  return (
    <svg className="ekg" viewBox="0 0 1100 56" preserveAspectRatio="none" aria-hidden="true">
      <motion.path d={d} initial={{ pathLength: 0 }} animate={{ pathLength: [0, 1, 1], opacity: [1, 1, 0] }}
        transition={{ duration: 4.5, times: [0, .8, 1], repeat: Infinity, ease: 'linear', delay: 1.2 }} />
    </svg>
  )
}

export default function Hero() {
  const clock = useClock()
  return (
    <section className="hero" id="top">
      <Backdrop />
      <div className="wrap hero-inner">
        <motion.div className="eyebrow" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: .2 }}>
          <span className="pulse" /> {PROFILE.name} <b>/</b> {PROFILE.role}
        </motion.div>

        <h1 className="h-display" style={{ marginTop: 22 }}>
          {LINES.map((parts, i) => (
            <span className="line" key={i}>
              <motion.span initial={{ y: '105%' }} animate={{ y: 0 }} transition={{ duration: 1.1, delay: .25 + i * .12, ease }}>
                {parts}
              </motion.span>
            </span>
          ))}
        </h1>
        <Ekg />

        <div className="hero-foot">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: .8, ease }}>
            <p className="lede">
              Full-stack engineer on compliance and payroll SaaS at <span style={{ color: 'var(--fg)' }}>{PROFILE.company}</span>.
              I like the unglamorous parts: data pipelines that don't drop rows, syncs that recover on their own,
              and security holes closed before anyone finds them.
            </p>
            <div className="btns">
              <a className="btn solid" href="#work">See the work <FiArrowDownRight /></a>
              <a className="btn" href={Resume} target="_blank" rel="noopener noreferrer">Résumé <FiArrowUpRight /></a>
            </div>
          </motion.div>

          <motion.div className="status" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 1, ease }}>
            <div className="status-row"><span>status</span><span style={{ color: 'var(--ok)' }}>● operational</span></div>
            <div className="status-row"><span>currently</span><span>SDE @ {PROFILE.company}</span></div>
            <div className="status-row"><span>based in</span><span>{PROFILE.location}</span></div>
            <div className="status-row"><span>local time</span><span>{clock} IST</span></div>
            <div className="status-row"><span>open to</span><span>interesting problems</span></div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
