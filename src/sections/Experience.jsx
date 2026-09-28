import { useRef, useState } from 'react'
import { motion, useScroll, AnimatePresence } from 'framer-motion'
import { EXPERIENCE, PROFILE } from '../data'

export default function Experience() {
  const railRef = useRef(null)
  const [idx, setIdx] = useState(0)
  const { scrollYProgress } = useScroll({ target: railRef, offset: ['start 70%', 'end 70%'] })
  const cur = EXPERIENCE[idx]

  return (
    <section className="section" id="experience">
      <div className="wrap">
        <div className="eyebrow"><b>03</b> Experience</div>
        <h2 className="h-display h2" style={{ marginTop: 18 }}>Where I've<br />shipped.</h2>

        <div className="xp">
          <aside className="xp-side">
            <div className="mono" style={{ color: 'var(--fg-3)' }}>{String(idx + 1).padStart(2, '0')} / {String(EXPERIENCE.length).padStart(2, '0')}</div>
            <AnimatePresence mode="wait">
              <motion.div key={idx} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: .35 }}>
                <div className="big" style={{ marginTop: 14 }}>{cur.org}</div>
                <div className="mono" style={{ color: 'var(--fg-2)', marginTop: 10 }}>{cur.period}</div>
              </motion.div>
            </AnimatePresence>
            <div className="mono" style={{ color: 'var(--fg-3)', marginTop: 40, lineHeight: 1.7 }}>{PROFILE.education}</div>
          </aside>

          <div className="xp-rail" ref={railRef}>
            <div className="track" />
            <motion.div className="fill" style={{ scaleY: scrollYProgress }} />
            {EXPERIENCE.map((r, i) => (
              <motion.article key={r.org} className={`role ${r.current ? 'current' : ''}`}
                onViewportEnter={() => setIdx(i)} viewport={{ amount: .4 }}
                initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: .8, ease: [0.16, 1, 0.3, 1] }}>
                <div className="mono" style={{ color: 'var(--fg-3)', marginBottom: 12 }}>{r.period}</div>
                <h3>
                  {r.org}
                  {r.current && <span className="badge-now"><span className="pulse" style={{ width: 6, height: 6, background: 'var(--signal)' }} />now</span>}
                </h3>
                <div className="meta mono"><span style={{ color: 'var(--fg)' }}>{r.role}</span><span>{r.meta}</span></div>
                <p className="summary">{r.summary}</p>
                <ul>
                  {r.points.map(([head, rest]) => <li key={head}><b>{head}</b>{rest}</li>)}
                </ul>
                <div className="tags">{r.tags.map(t => <span className="tag" key={t}>{t}</span>)}</div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
