import { motion } from 'framer-motion'
import { Reveal } from '../components/Fx'
import Cover from '../components/Cover'
import { PROJECTS } from '../data'

const SUB = {
  jobmesh: '2,000+ jobs from 100+ companies, pulled from scattered ATS portals into one feed.',
  ejg: 'Jobs in Germany that don’t require German. 2,853 boards, AI-classified, sent to WhatsApp.',
  proxyclaw: 'Deploy AI agents without an infrastructure team.',
  crunch: 'A wallet’s risk score in seconds, before you send money.',
  devsync: 'Find developers by stack and talk in real time.',
}

export function Chapter({ no, title, jp }) {
  return (
    <div className="chap">
      <span className="no">{no}</span>
      <Reveal lines={[title]} />
      <span className="jp">{jp}</span>
    </div>
  )
}

export default function Work() {
  return (
    <section id="work" className="sec pad">
      <Chapter no="CH.02" title="Selected work" jp="作品" />
      <div className="page">
        {PROJECTS.map((p, i) => {
          const live = p.status === 'live'
          return (
            <motion.a className="cell" key={p.id} href={live ? p.live : p.code} target="_blank" rel="noopener noreferrer" data-cursor="View"
              initial={{ opacity: 0, y: 40, rotate: i % 2 ? 1.5 : -1.5 }} whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={{ once: true, amount: .2 }} transition={{ type: 'spring', stiffness: 120, damping: 16, delay: (i % 3) * .06 }}>
              <div className="panel">
                <div className="art">
                  <Cover kind={p.id} />
                  <span className="num">{String(i + 1).padStart(2, '0')}</span>
                  <span className={`stamp ${live ? '' : 'arc'}`}>{live ? 'LIVE' : 'ARCHIVE'}</span>
                </div>
                <div className="cap">
                  <span className="label">{p.kind} · {p.year}</span>
                  <h3>{p.name}</h3>
                  <p>{SUB[p.id]}</p>
                  <span className="go"><span>{live ? `Visit ${p.live.replace(/^https?:\/\//, '').replace(/\/$/, '')}` : 'View source on GitHub'}</span> ↗</span>
                </div>
              </div>
            </motion.a>
          )
        })}
      </div>
    </section>
  )
}
