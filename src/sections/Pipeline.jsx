import { motion } from 'framer-motion'

// An animated system diagram of the English Jobs Germany pipeline: packets flow node to node.
const NODES = [
  { id: 'src', x: 20, y: 110, w: 150, title: '2,853 boards', sub: '9 ATS platforms' },
  { id: 'hash', x: 230, y: 110, w: 150, title: 'SHA-256 diff', sub: 'skip unchanged' },
  { id: 'dedup', x: 440, y: 40, w: 150, title: 'Dedup + expiry', sub: 'safe removals' },
  { id: 'llm', x: 440, y: 180, w: 150, title: 'Gemini / Gemma', sub: 'fallback + quota' },
  { id: 'db', x: 650, y: 110, w: 150, title: 'MongoDB', sub: 'bulk writes' },
  { id: 'cache', x: 860, y: 40, w: 150, title: 'Search cache', sub: 'change streams' },
  { id: 'wa', x: 860, y: 180, w: 150, title: 'WhatsApp', sub: 'scheduled drops' },
]
const H = 64
const byId = Object.fromEntries(NODES.map(n => [n.id, n]))
const EDGES = [['src', 'hash'], ['hash', 'dedup'], ['hash', 'llm'], ['dedup', 'db'], ['llm', 'db'], ['db', 'cache'], ['db', 'wa']]

function edgePath([a, b]) {
  const A = byId[a], B = byId[b]
  const x1 = A.x + A.w, y1 = A.y + H / 2, x2 = B.x, y2 = B.y + H / 2
  const mx = (x1 + x2) / 2
  return `M${x1} ${y1} C ${mx} ${y1}, ${mx} ${y2}, ${x2} ${y2}`
}

export default function Pipeline() {
  return (
    <section className="section" id="systems">
      <div className="wrap">
        <div className="eyebrow"><b>04</b> How I think</div>
        <h2 className="h-display h2" style={{ marginTop: 18 }}>Systems, not<br />just screens.</h2>
        <p className="lede" style={{ marginTop: 22 }}>
          The pipeline behind English Jobs Germany, the way I'd sketch it on a whiteboard. It used to time out at 45 minutes. Now it finishes in about six.
        </p>

        <div className="pipe">
          <svg viewBox="0 0 1030 270" role="img" aria-label="Pipeline: job boards to hash diff to dedup and LLM classification, into MongoDB, out to search cache and WhatsApp">
            <defs>
              <linearGradient id="edge" x1="0" x2="1"><stop offset="0" stopColor="rgba(236,234,228,.12)" /><stop offset="1" stopColor="rgba(236,234,228,.3)" /></linearGradient>
            </defs>
            {EDGES.map((e, i) => {
              const d = edgePath(e)
              return (
                <g key={e.join()}>
                  <motion.path d={d} stroke="url(#edge)" strokeWidth="1.5" fill="none"
                    initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1, delay: i * .12 }} />
                  {[0, 1, 2].map(k => (
                    <circle key={k} r="3.5" fill={e[0] === 'hash' && e[1] === 'llm' ? '#7CF7D4' : '#FF6B2C'}>
                      <animateMotion dur={`${2.4 + (i % 3) * .3}s`} begin={`${k * .8 + i * .15}s`} repeatCount="indefinite" path={d} />
                    </circle>
                  ))}
                </g>
              )
            })}
            {NODES.map((n, i) => (
              <motion.g key={n.id} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: .2 + i * .08 }}>
                <rect x={n.x} y={n.y} width={n.w} height={H} rx="12" fill="#0A0B0E" stroke="rgba(236,234,228,.18)" />
                <text x={n.x + 16} y={n.y + 28} fill="#ECEAE4" fontFamily="Bricolage Grotesque" fontWeight="600" fontSize="16">{n.title}</text>
                <text x={n.x + 16} y={n.y + 47} fill="#5E5D59" fontFamily="JetBrains Mono" fontSize="11">{n.sub}</text>
              </motion.g>
            ))}
          </svg>
          <div className="pipe-legend">
            <div><b>Do less work</b>Hash every board. If nothing changed, skip it. Most boards don't change between runs.</div>
            <div><b>Filter before the LLM</b>Cheap rules run first, so models only see what they need to. Fallback models absorb quota limits.</div>
            <div><b>Write in bulk</b>Batched upserts instead of row-by-row writes, with expiry that never deletes a live job.</div>
            <div><b>Fail small</b>One broken board can't sink the run. 39 of 39 scheduled runs succeeded.</div>
          </div>
        </div>
      </div>
    </section>
  )
}
