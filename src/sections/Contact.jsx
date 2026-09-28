import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiArrowUpRight, FiCopy, FiCheck } from 'react-icons/fi'
import { PROFILE } from '../data'
import Resume from '../assets/Ashish_Ranjan_SWE_Resume.pdf'

const LINKS = [
  ['GitHub', PROFILE.links.github, 'code'],
  ['LinkedIn', PROFILE.links.linkedin, 'career'],
  ['LeetCode', PROFILE.links.leetcode, 'practice'],
  ['Résumé', Resume, 'pdf'],
]

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState(null)
  const [copied, setCopied] = useState(false)
  const change = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const submit = async e => {
    e.preventDefault()
    setStatus('sending')
    try {
      const r = await fetch('https://formspree.io/f/mwprozwb', { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(form) })
      if (!r.ok) throw new Error()
      setStatus('sent')
      setForm({ name: '', email: '', message: '' })
    } catch { setStatus('error') }
  }

  const copy = async () => {
    try { await navigator.clipboard.writeText(PROFILE.email); setCopied(true); setTimeout(() => setCopied(false), 1800) } catch { /* clipboard blocked */ }
  }

  return (
    <section className="section contact" id="contact">
      <div className="wrap">
        <div className="eyebrow"><b>06</b> Contact</div>
        <motion.h2 className="h-display contact-big" style={{ marginTop: 18 }}
          initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}>
          Let's build<br />something that<br /><span className="accent">stays up.</span>
        </motion.h2>

        <div className="btns" style={{ marginTop: 36 }}>
          <a className="btn solid" href={`mailto:${PROFILE.email}`}>{PROFILE.email} <FiArrowUpRight /></a>
          <button className="btn" onClick={copy}>{copied ? <><FiCheck /> Copied</> : <><FiCopy /> Copy email</>}</button>
        </div>

        <div className="contact-grid">
          <form onSubmit={submit}>
            <label className="field"><span>Name</span><input name="name" value={form.name} onChange={change} required autoComplete="name" /></label>
            <label className="field"><span>Email</span><input name="email" type="email" value={form.email} onChange={change} required autoComplete="email" /></label>
            <label className="field"><span>What are you building?</span><textarea name="message" rows={4} value={form.message} onChange={change} required /></label>
            <button className="btn solid" type="submit" disabled={status === 'sending'} style={{ marginTop: 8 }}>
              {status === 'sending' ? 'Sending…' : 'Send message'} <FiArrowUpRight />
            </button>
            {status === 'sent' && <p className="mono" style={{ color: 'var(--ok)', marginTop: 14 }}>✓ Received. I reply within a day.</p>}
            {status === 'error' && <p className="mono" style={{ color: 'var(--signal)', marginTop: 14 }}>That didn't go through. Email me directly instead.</p>}
          </form>
          <div>
            {LINKS.map(([label, href, note]) => (
              <a key={label} className="linkrow" href={href} target="_blank" rel="noopener noreferrer">
                <span>{label}</span><small>{note} ↗</small>
              </a>
            ))}
          </div>
        </div>

        <footer className="footer mono">
          <span>© {new Date().getFullYear()} {PROFILE.name}</span>
          <span>Designed and built by hand. React, WebGL, Framer Motion.</span>
          <a href="#top">Back to top ↑</a>
        </footer>
      </div>
    </section>
  )
}
