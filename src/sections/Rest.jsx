import { useEffect, useRef, useState } from 'react'
import { animate, useInView, motion, AnimatePresence } from 'framer-motion'
import { EXPERIENCE, PROFILE } from '../data'
import Resume from '../assets/Ashish_Ranjan_SWE_Resume.pdf'
import { Magnetic } from '../components/Fx'
import { Chapter } from './Work'

function Count({ to, suffix = '', decimals = 0 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: .6 })
  const [v, setV] = useState(to)
  useEffect(() => {
    if (!inView) return
    const c = animate(0, to, { duration: 1.8, ease: [0.16, 1, 0.3, 1], onUpdate: setV })
    return () => c.stop()
  }, [inView, to])
  return <b ref={ref}>{v.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}{suffix}</b>
}

function Bar({ pct, hot, run }) {
  return <span className="track"><i className={hot ? 'hot' : ''} style={{ transform: `scaleX(${run ? pct : 0})` }} /></span>
}

export function Numbers() {
  const ref = useRef(null)
  const run = useInView(ref, { once: true, amount: .4 })
  const STATS = [
    ['SPEED', .87, '45m → 6m', true],
    ['SCALE', .95, '2,853 boards'],
    ['EFFICIENCY', .975, 'cache −97.5%'],
    ['DEFENCE', .8, '60 tests'],
    ['UPTIME', 1, '39/39 runs'],
  ]
  return (
    <section className="sec pad" id="numbers">
      <Chapter no="CH.03" title="Power level" jp="ステータス" />
      <div className="status" ref={ref}>
        <div className="panel dark stat-card">
          <h3>ASHISH RANJAN</h3>
          <div className="cls">CLASS: FULL-STACK ENGINEER · LV. 2026</div>
          {STATS.map(([k, pct, note, hot]) => (
            <div className="stat" key={k}><span>{k}</span><Bar pct={pct} hot={hot} run={run} /><em>{note}</em></div>
          ))}
        </div>
        <div className="big-nums">
          <div className="panel bn"><Count to={6} suffix="m" /><span>Scraper runtime, down from a 45-minute timeout.</span></div>
          <div className="panel bn tone-bg"><Count to={2853} /><span>Job boards ingested across 9 ATS platforms.</span></div>
          <div className="panel bn"><Count to={97.5} suffix="%" decimals={1} /><span>Smaller AI cache. 87 MB down to 2.2 MB.</span></div>
        </div>
      </div>
    </section>
  )
}

export function Experience() {
  const arcs = EXPERIENCE
  return (
    <section className="sec pad" id="experience">
      <Chapter no="CH.04" title="Story arcs" jp="物語" />
      <div className="arcs">
        {arcs.map((r, i) => (
          <motion.article className={`panel arc ${r.current ? 'now' : ''}`} key={r.org}
            initial={{ opacity: 0, y: 40, rotate: i % 2 ? 1 : -1 }} whileInView={{ opacity: 1, y: 0, rotate: 0 }} viewport={{ once: true, amount: .2 }}
            transition={{ type: 'spring', stiffness: 110, damping: 18 }}>
            <div className="arc-tag"><b>ARC {arcs.length - i}</b><span>{r.period}</span></div>
            <div className="arc-body">
              <h3>{r.org}</h3>
              <div className="role">{r.role} <span className="label">· {r.meta}</span></div>
              <p className="sum">{r.summary}</p>
              <ul>{r.points.slice(0, 3).map(([h, rest]) => <li key={h}><b>{h}</b>{rest}</li>)}</ul>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  )
}

export function Contact() {
  const [open, setOpen] = useState(false)
  return (
    <section className="ending pad" id="contact">
      <Chapter no="CH.05" title="Next episode" jp="次回予告" />
      <div className="panel end-panel">
        <span className="label">Available for new work · {PROFILE.location}</span>
        <Magnetic strength={.12}><button type="button" className="talk" onClick={() => setOpen(true)} data-cursor="Write">Let’s talk</button></Magnetic>
        <p className="mail">{PROFILE.email}</p>
        <a className="tbc" href="#top" aria-label="Back to the top"><span>TO BE CONTINUED</span><i /></a>
      </div>
      <footer className="foot">
        <span>© {new Date().getFullYear()} {PROFILE.name}</span>
        <nav>
          <a href={PROFILE.links.github} target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href={PROFILE.links.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href={PROFILE.links.leetcode} target="_blank" rel="noopener noreferrer">LeetCode</a>
          <a href={Resume} target="_blank" rel="noopener noreferrer">Resume</a>
        </nav>
      </footer>
      <AnimatePresence>{open && <TalkForm onClose={() => setOpen(false)} />}</AnimatePresence>
    </section>
  )
}

function TalkForm({ onClose }) {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState(null)
  const first = useRef(null)
  const change = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  useEffect(() => {
    first.current?.focus()
    const esc = e => e.key === 'Escape' && onClose()
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', esc)
    return () => { window.removeEventListener('keydown', esc); document.body.style.overflow = prev }
  }, [onClose])

  const submit = async e => {
    e.preventDefault()
    setStatus('sending')
    try {
      const r = await fetch('https://formspree.io/f/mwprozwb', { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(form) })
      if (!r.ok) throw new Error()
      setStatus('sent')
    } catch { setStatus('error') }
  }

  return (
    <motion.div className="modal-bg" onMouseDown={e => e.target === e.currentTarget && onClose()}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: .3 }}>
      <motion.div className="modal" role="dialog" aria-modal="true" aria-labelledby="talk-title"
        initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 20, opacity: 0 }} transition={{ duration: .5, ease: [0.16, 1, 0.3, 1] }}>
        <div className="modal-head">
          <h2 id="talk-title">Let’s talk</h2>
          <button type="button" className="x" onClick={onClose} aria-label="Close">✕</button>
        </div>
        {status === 'sent' ? (
          <div className="sent">
            <p>Message received. I’ll reply within a day.</p>
            <button type="button" className="send" onClick={onClose}>Close</button>
          </div>
        ) : (
          <form onSubmit={submit}>
            <div className="f2">
              <label className="fld"><span>Name</span><input ref={first} name="name" value={form.name} onChange={change} required autoComplete="name" /></label>
              <label className="fld"><span>Email</span><input name="email" type="email" value={form.email} onChange={change} required autoComplete="email" /></label>
            </div>
            <label className="fld"><span>Message</span><textarea name="message" rows={5} value={form.message} onChange={change} required placeholder="What are you building?" /></label>
            <div className="modal-foot">
              <span className="label">{status === 'error' ? `Couldn’t send. Email ${PROFILE.email}` : 'Replies within 24 hours'}</span>
              <button type="submit" className="send" disabled={status === 'sending'}>{status === 'sending' ? 'Sending…' : 'Send message →'}</button>
            </div>
          </form>
        )}
      </motion.div>
    </motion.div>
  )
}
