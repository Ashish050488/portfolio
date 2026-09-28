import { useEffect, useRef, useState } from 'react'
import { motion, useInView, animate } from 'framer-motion'
import { METRICS } from '../data'

function Count({ to, decimals = 0, run }) {
  const [v, setV] = useState(0)
  useEffect(() => {
    if (!run) return
    const c = animate(0, to, { duration: 1.8, ease: [0.16, 1, 0.3, 1], onUpdate: setV })
    return () => c.stop()
  }, [run, to])
  return v.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
}

// Tiny data-viz for each receipt.
function Viz({ kind, run }) {
  const s = { stroke: 'var(--signal)', fill: 'none', strokeWidth: 2 }
  switch (kind) {
    case 'shrink':
      return (
        <svg className="viz" viewBox="0 0 300 44" width="100%">
          <rect x="0" y="8" width="300" height="10" rx="5" fill="rgba(236,234,228,.08)" />
          <motion.rect x="0" y="26" height="10" rx="5" fill="var(--signal)" initial={{ width: 300 }} animate={{ width: run ? 40 : 300 }} transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1], delay: .2 }} />
        </svg>
      )
    case 'grid':
      return (
        <svg className="viz" viewBox="0 0 300 44" width="100%">
          {Array.from({ length: 60 }, (_, i) => (
            <motion.rect key={i} x={(i % 30) * 10} y={Math.floor(i / 30) * 14 + 8} width="7" height="10" rx="1.5" fill="var(--signal)"
              initial={{ opacity: .08 }} animate={{ opacity: run ? [0.08, 1, i % 7 === 0 ? 1 : 0.35] : 0.08 }} transition={{ delay: i * 0.02, duration: .6 }} />
          ))}
        </svg>
      )
    case 'bar':
      return (
        <svg className="viz" viewBox="0 0 300 44" width="100%">
          <motion.rect y="6" height="32" rx="4" fill="rgba(236,234,228,.1)" initial={{ width: 300, x: 0 }} />
          <motion.rect y="6" height="32" rx="4" fill="var(--signal)" initial={{ width: 300 }} animate={{ width: run ? 7.5 : 300 }} transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }} />
          <text x="296" y="27" textAnchor="end" fill="var(--fg-3)" fontFamily="JetBrains Mono" fontSize="11">87 MB → 2.2 MB</text>
        </svg>
      )
    case 'rise':
      return (
        <svg className="viz" viewBox="0 0 300 44" width="100%">
          <motion.path d="M0 40 C 80 40, 120 38, 160 30 S 250 6, 300 4" {...s} initial={{ pathLength: 0 }} animate={{ pathLength: run ? 1 : 0 }} transition={{ duration: 1.6 }} />
          <circle cx="0" cy="40" r="3" fill="var(--fg-3)" />
        </svg>
      )
    case 'shield':
      return (
        <svg className="viz" viewBox="0 0 300 44" width="100%">
          {Array.from({ length: 60 }, (_, i) => (
            <motion.circle key={i} cx={5 + (i % 30) * 10} cy={i < 30 ? 14 : 30} r="3" fill="var(--ok)" initial={{ scale: 0 }} animate={{ scale: run ? 1 : 0 }} transition={{ delay: i * 0.025 }} />
          ))}
        </svg>
      )
    default:
      return (
        <svg className="viz" viewBox="0 0 300 44" width="100%">
          {Array.from({ length: 39 }, (_, i) => (
            <motion.rect key={i} x={i * 7.7} y="10" width="5" height="24" rx="1.5" fill="var(--ok)" initial={{ scaleY: 0 }} animate={{ scaleY: run ? 1 : 0 }}
              style={{ transformOrigin: 'bottom', transformBox: 'fill-box' }} transition={{ delay: i * 0.03, duration: .4 }} />
          ))}
        </svg>
      )
  }
}

function Metric({ m, i }) {
  const ref = useRef(null)
  const run = useInView(ref, { once: true, amount: .5 })
  return (
    <motion.div ref={ref} className="metric" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: (i % 3) * .08 }}>
      <div className="label">{m.label}</div>
      <div className="num">
        {m.prefix && <small>{m.prefix}</small>}
        <Count to={m.value} decimals={m.decimals} run={run} />
        {m.suffix && <small>{m.suffix}</small>}
      </div>
      <p>{m.note}</p>
      <Viz kind={m.viz} run={run} />
    </motion.div>
  )
}

export default function Impact() {
  return (
    <section className="section" id="impact">
      <div className="wrap">
        <div className="eyebrow"><b>02</b> Receipts</div>
        <h2 className="h-display h2" style={{ marginTop: 18 }}>Numbers I've<br />actually moved.</h2>
        <p className="lede" style={{ marginTop: 22 }}>Not vanity stats. Each one is a before-and-after from production systems with real users on the other end.</p>
        <div className="metrics">
          {METRICS.map((m, i) => <Metric key={m.label} m={m} i={i} />)}
        </div>
      </div>
    </section>
  )
}
