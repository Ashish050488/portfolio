import { motion } from 'framer-motion'
import { STACK } from '../data'

export default function Stack() {
  return (
    <section className="section" id="stack">
      <div className="wrap">
        <div className="eyebrow"><b>05</b> Toolbox</div>
        <h2 className="h-display h2" style={{ marginTop: 18 }}>The whole<br />stack.</h2>
        <p className="lede" style={{ marginTop: 22 }}>From the pixel to the database index to the rate limiter in between.</p>
        <div className="stack">
          {STACK.map((l, i) => (
            <motion.div key={l.layer} className="layer" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: (i % 3) * .08, duration: .7 }}>
              <h4>{l.layer}<span>{String(l.items.length).padStart(2, '0')}</span></h4>
              <div className="tags">{l.items.map(t => <span className="tag" key={t}>{t}</span>)}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
