import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Loops a counter while the mock is on screen, driving each little product demo.
function useTick(ms, active) {
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!active) return
    const id = setInterval(() => setN(v => v + 1), ms)
    return () => clearInterval(id)
  }, [ms, active])
  return n
}

function Window({ url, children }) {
  return (
    <div className="mock">
      <div className="mock-bar"><i /><i /><i /><span className="url">{url}</span></div>
      <div className="mock-body">{children}</div>
    </div>
  )
}

const muted = { color: 'var(--fg-3)' }

function JobMesh({ active }) {
  const JOBS = [
    ['Razorpay', 'Backend Engineer II', 'Bengaluru', 'Lever'],
    ['Zepto', 'SDE — Platform', 'Mumbai', 'Greenhouse'],
    ['Postman', 'Frontend Engineer', 'Remote', 'Workday'],
    ['CRED', 'Software Engineer', 'Bengaluru', 'Ashby'],
    ['Swiggy', 'SDE 2 — Payments', 'Bengaluru', 'Lever'],
    ['Groww', 'Full Stack Engineer', 'Pune', 'SmartRecruiters'],
  ]
  const q = 'node.js backend'
  const n = useTick(140, active)
  const typed = q.slice(0, n % 60)
  const shown = Math.min(JOBS.length, Math.max(0, (n % 60) - q.length))
  return (
    <Window url="jobmesh.in/search">
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, border: '1px solid var(--line-hi)', borderRadius: 8, padding: '9px 12px', marginBottom: 12 }}>
        <span style={muted}>⌕</span><span>{typed}<span style={{ color: '#FF6B2C' }}>▍</span></span>
        <span style={{ marginLeft: 'auto', ...muted }}>2,041 jobs</span>
      </div>
      <div style={{ display: 'grid', gap: 6 }}>
        <AnimatePresence>
          {JOBS.slice(0, shown).map(([co, role, loc, ats]) => (
            <motion.div key={co} initial={{ opacity: 0, x: -14 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}
              style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 10px', borderRadius: 8, background: 'rgba(255,255,255,.03)' }}>
              <span style={{ width: 26, height: 26, borderRadius: 6, background: 'rgba(255,107,44,.15)', color: '#FF6B2C', display: 'grid', placeItems: 'center', fontWeight: 600 }}>{co[0]}</span>
              <span style={{ flex: 1, minWidth: 0 }}>
                <div style={{ color: 'var(--fg)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{role}</div>
                <div style={muted}>{co} · {loc}</div>
              </span>
              <span style={{ fontSize: 10, ...muted, border: '1px solid var(--line)', borderRadius: 99, padding: '2px 7px' }}>{ats}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </Window>
  )
}

function Ejg({ active }) {
  const n = useTick(90, active)
  const ATS = ['Personio', 'Greenhouse', 'Lever', 'Workday', 'SmartRecruiters', 'Ashby', 'Recruitee', 'Join', 'Teamtailor']
  const JOBS = [['Senior Backend Dev — Berlin', true], ['Werkstudent Marketing', false], ['Data Engineer — Munich', true], ['Vertriebsleiter (m/w/d)', false], ['Product Designer — Hamburg', true]]
  const phase = n % 110
  return (
    <Window url="englishjobsgermany.com — pipeline">
      <div style={{ ...muted, marginBottom: 10 }}>$ run scrape --boards 2853</div>
      <div style={{ display: 'grid', gap: 5, marginBottom: 14 }}>
        {ATS.map((a, i) => {
          const p = Math.max(0, Math.min(1, (phase - i * 3) / 30))
          return (
            <div key={a} style={{ display: 'grid', gridTemplateColumns: '112px 1fr 38px', alignItems: 'center', gap: 8 }}>
              <span style={{ color: 'var(--fg-2)' }}>{a}</span>
              <span style={{ height: 5, borderRadius: 3, background: 'rgba(255,255,255,.06)', overflow: 'hidden' }}>
                <span style={{ display: 'block', height: '100%', width: `${p * 100}%`, background: '#7CF7D4', transition: 'width .09s linear' }} />
              </span>
              <span style={{ textAlign: 'right', color: p === 1 ? '#7CF7D4' : 'var(--fg-3)' }}>{p === 1 ? 'done' : `${Math.round(p * 100)}%`}</span>
            </div>
          )
        })}
      </div>
      <div style={{ ...muted, marginBottom: 6 }}>gemini · classify german requirement</div>
      {JOBS.map(([t, en], i) => (
        <motion.div key={t} animate={{ opacity: phase > 45 + i * 8 ? 1 : 0.15 }} style={{ display: 'flex', justifyContent: 'space-between', padding: '3px 0' }}>
          <span style={{ color: 'var(--fg-2)' }}>{t}</span>
          <span style={{ color: en ? '#7CF7D4' : '#FF6B2C' }}>{en ? 'EN ✓' : 'DE ✗'}</span>
        </motion.div>
      ))}
    </Window>
  )
}

function ProxyClaw({ active }) {
  const n = useTick(700, active)
  const AGENTS = ['support-bot', 'lead-qualifier', 'sql-analyst', 'research-agent']
  const LOG = ['pulling image agent-runtime:1.4', 'container c7f2 created', 'health check ✓ 38ms', 'ws: client connected', 'billing: usage metered', 'scaling replicas 1 → 2']
  return (
    <Window url="app.proxyclaw.xyz/deployments">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 12 }}>
        {AGENTS.map((a, i) => {
          const state = (n + i * 2) % 9 < 2 ? 'deploying' : 'running'
          const c = state === 'running' ? '#7CF7D4' : '#B69CFF'
          return (
            <div key={a} style={{ border: '1px solid var(--line)', borderRadius: 8, padding: 10 }}>
              <div style={{ color: 'var(--fg)' }}>{a}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 6, color: c }}>
                <motion.span animate={{ opacity: state === 'running' ? 1 : [1, .2, 1] }} transition={{ repeat: Infinity, duration: .8 }}
                  style={{ width: 6, height: 6, borderRadius: 9, background: c, display: 'block' }} />{state}
              </div>
            </div>
          )
        })}
      </div>
      <div style={{ background: '#07080A', borderRadius: 8, padding: 10, height: 128, overflow: 'hidden' }}>
        {Array.from({ length: 6 }, (_, k) => {
          const i = n + k
          return <div key={i} style={{ color: k === 5 ? 'var(--fg)' : 'var(--fg-3)' }}><span style={{ color: '#B69CFF' }}>›</span> {LOG[i % LOG.length]}</div>
        })}
      </div>
    </Window>
  )
}

function Crunch({ active }) {
  const n = useTick(2600, active)
  const WALLETS = [['0x3f…9a1c', 18], ['0xb7…04de', 72], ['0x91…c33f', 41]]
  const [addr, score] = WALLETS[n % WALLETS.length]
  const col = score > 60 ? '#FF6B2C' : score > 35 ? '#FFD23F' : '#7CF7D4'
  const R = 70, C = Math.PI * R
  return (
    <Window url="crunchguardian.app/wallet">
      <div style={{ ...muted, marginBottom: 6 }}>wallet</div>
      <div style={{ color: 'var(--fg)', marginBottom: 8 }}>{addr}</div>
      <div style={{ display: 'grid', placeItems: 'center' }}>
        <svg viewBox="0 0 180 100" width="230">
          <path d={`M20 90 A${R} ${R} 0 0 1 160 90`} stroke="rgba(255,255,255,.08)" strokeWidth="12" fill="none" strokeLinecap="round" />
          <motion.path d={`M20 90 A${R} ${R} 0 0 1 160 90`} stroke={col} strokeWidth="12" fill="none" strokeLinecap="round"
            strokeDasharray={C} animate={{ strokeDashoffset: C * (1 - score / 100) }} initial={{ strokeDashoffset: C }} transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }} />
          <text x="90" y="80" textAnchor="middle" fill="var(--fg)" fontSize="30" fontFamily="Bricolage Grotesque" fontWeight="600">{score}</text>
          <text x="90" y="96" textAnchor="middle" fill={col} fontSize="9" fontFamily="JetBrains Mono">{score > 60 ? 'HIGH RISK' : score > 35 ? 'CAUTION' : 'LOW RISK'}</text>
        </svg>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 8, marginTop: 10 }}>
        {[['txns', 1284 + score * 7], ['age', `${(score % 5) + 1}y`], ['flags', Math.floor(score / 20)]].map(([k, v]) => (
          <div key={k} style={{ border: '1px solid var(--line)', borderRadius: 8, padding: 8 }}>
            <div style={muted}>{k}</div><div style={{ color: 'var(--fg)', marginTop: 4 }}>{v}</div>
          </div>
        ))}
      </div>
    </Window>
  )
}

function DevSync({ active }) {
  const n = useTick(1300, active)
  const MSGS = [
    [0, 'saw your repo on ws scaling — nice'],
    [1, 'thanks! using redis pub/sub for fan-out'],
    [0, 'want to pair on the presence feature?'],
    [1, 'yes — sending a connect request'],
    [0, 'connected ✓'],
  ]
  const shown = n % (MSGS.length + 3)
  return (
    <Window url="devsync — chat">
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, paddingBottom: 10, borderBottom: '1px solid var(--line)', marginBottom: 12 }}>
        <span style={{ width: 28, height: 28, borderRadius: 99, background: 'linear-gradient(135deg,#5AA9FF,#B69CFF)' }} />
        <span><div style={{ color: 'var(--fg)' }}>priya.dev</div><div style={{ color: '#7CF7D4', fontSize: 10 }}>● online · React, Go</div></span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, minHeight: 200 }}>
        <AnimatePresence>
          {MSGS.slice(0, Math.min(shown, MSGS.length)).map(([me, t]) => (
            <motion.div key={t} initial={{ opacity: 0, y: 10, scale: .96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0 }}
              style={{ alignSelf: me ? 'flex-end' : 'flex-start', maxWidth: '78%', padding: '8px 11px', borderRadius: 12, background: me ? '#5AA9FF' : 'rgba(255,255,255,.06)', color: me ? '#07080A' : 'var(--fg)' }}>{t}</motion.div>
          ))}
        </AnimatePresence>
      </div>
    </Window>
  )
}

export const MOCKS = { jobmesh: JobMesh, ejg: Ejg, proxyclaw: ProxyClaw, crunch: Crunch, devsync: DevSync }
