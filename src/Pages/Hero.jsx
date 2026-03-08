import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const LINES = [
  { cmd:true,  text:'ls projects/' },
  { cmd:false, text:'ProxyClaw/  CrunchGuardian/  DevSync/' },
  { cmd:true,  text:'git log --oneline -1' },
  { cmd:false, text:'a3f19c2 feat: real-time WebSocket chat' },
  { cmd:true,  text:'npm run build' },
  { cmd:false, text:'\u2713 compiled in 2.4s' },
]

function useTyping() {
  const [rows, setRows] = useState([])
  const [on,   setOn]   = useState(true)
  useEffect(() => {
    let li=0, ci=0, cur=[]
    const blink = setInterval(()=>setOn(v=>!v), 530)
    const step = () => {
      if(li >= LINES.length) return
      const line = LINES[li]
      if(ci <= line.text.length) {
        cur = [...cur.slice(0,li), {...line, shown: line.text.slice(0,ci)}]
        setRows([...cur]); ci++
        setTimeout(step, line.cmd ? 48 : 20)
      } else { li++; ci=0; setTimeout(step, 650) }
    }
    const t = setTimeout(step, 900)
    return () => { clearTimeout(t); clearInterval(blink) }
  }, [])
  return { rows, on }
}

function useCount(target, delay) {
  const [v, setV] = useState(0)
  useEffect(() => {
    const t = setTimeout(() => {
      const s = Date.now()
      const tick = () => {
        const p = Math.min((Date.now()-s)/1200, 1)
        setV(Math.floor(p*target))
        if(p<1) requestAnimationFrame(tick); else setV(target)
      }
      requestAnimationFrame(tick)
    }, delay)
    return () => clearTimeout(t)
  }, [target, delay])
  return v
}

const fade = d => ({ initial:{opacity:0,y:28}, animate:{opacity:1,y:0}, transition:{duration:.8,delay:d,ease:[.76,0,.24,1]} })

export default function Hero() {
  const { rows, on } = useTyping()
  const p1 = useCount(3,   1000)
  const p2 = useCount(1,   1400)
  const p3 = useCount(300, 1200)

  return (
    <section id="hero" style={{ backgroundColor:'var(--bg)' }}>
      <div style={{
        paddingTop:'clamp(96px,14vw,144px)',
        paddingBottom:'clamp(64px,10vw,120px)',
        paddingLeft:'var(--pad-x)',
        paddingRight:'var(--pad-x)',
        maxWidth:'var(--max-w)',
        margin:'0 auto',
        display:'flex',
        flexDirection:'column',
        position:'relative',
      }}>

        {/* Available badge */}
        <motion.div {...fade(.1)} style={{ display:'inline-flex', alignItems:'center', gap:8, marginBottom:'clamp(24px,4vw,48px)', width:'fit-content' }}>
          <span className="avail-dot" />
          <span style={{ fontFamily:"'Geist Mono',monospace", fontSize:11, letterSpacing:'.22em', textTransform:'uppercase', color:'var(--fg-muted)' }}>Available for work</span>
        </motion.div>

        {/* Two-column grid */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(min(100%,380px),1fr))', gap:'clamp(32px,6vw,80px)', alignItems:'center', marginBottom:'clamp(40px,7vw,72px)' }}>

          {/* LEFT */}
          <div>
            <motion.h1 {...fade(.2)} style={{ fontFamily:"'Instrument Serif',serif", fontSize:'clamp(3.5rem,9vw,8rem)', fontWeight:400, lineHeight:.95, letterSpacing:'-.03em', color:'var(--fg)', marginBottom:'clamp(14px,2vw,22px)' }}>
              Ashish<br/>Ranjan<span style={{color:'var(--accent)'}}>.</span>
            </motion.h1>

            <motion.p {...fade(.35)} style={{ fontFamily:"'Geist Mono',monospace", fontSize:12, letterSpacing:'.18em', textTransform:'uppercase', color:'var(--accent)', marginBottom:'clamp(12px,2vw,18px)' }}>Fullstack Engineer</motion.p>

            <motion.p {...fade(.48)} style={{ fontFamily:"'Geist',sans-serif", fontSize:'clamp(14px,1.6vw,15.5px)', lineHeight:1.75, color:'var(--fg-muted)', maxWidth:420, marginBottom:'clamp(28px,4vw,40px)' }}>
              Fullstack engineer with ~1 year of production experience. I ship scalable systems — MERN stacks, SaaS backends, LLM-powered pipelines — and obsess over the details.
            </motion.p>

            <motion.button {...fade(.6)}
              onClick={()=>document.getElementById('projects')?.scrollIntoView({behavior:'smooth'})}
              onMouseEnter={e=>{e.currentTarget.style.backgroundColor='var(--accent)';e.currentTarget.style.color='#0A0A0A';e.currentTarget.style.borderColor='var(--accent)'}}
              onMouseLeave={e=>{e.currentTarget.style.backgroundColor='transparent';e.currentTarget.style.color='var(--fg)';e.currentTarget.style.borderColor='var(--border-hi)'}}
              style={{ fontFamily:"'Geist Mono',monospace", fontSize:11, letterSpacing:'.15em', textTransform:'uppercase', padding:'13px 28px', border:'1px solid var(--border-hi)', background:'transparent', color:'var(--fg)', transition:'all .3s ease', display:'inline-block' }}
            >Explore Work ↓</motion.button>
          </div>

          {/* RIGHT — terminal, hidden on mobile */}
          <motion.div {...fade(.7)} className="hidden sm:block">
            <div style={{ background:'#0D0D0D', border:'1px solid #2A2A2A', borderRadius:8, overflow:'hidden', boxShadow:'0 20px 60px rgba(0,0,0,.3)' }}>
              <div style={{ padding:'10px 16px', background:'#111', borderBottom:'1px solid #1E1E1E', display:'flex', alignItems:'center', gap:6 }}>
                {['#FF5F57','#FEBC2E','#28C840'].map(c=><span key={c} style={{width:12,height:12,borderRadius:'50%',background:c,display:'block'}}/>)}
                <span style={{ fontFamily:"'Geist Mono'", fontSize:11, color:'#3A3A3A', marginLeft:8 }}>~/ashish/dev</span>
              </div>
              <div style={{ padding:'18px 20px', minHeight:190, fontFamily:"'Geist Mono',monospace", fontSize:13, lineHeight:1.9 }}>
                {rows.length===0 && <span><span style={{color:'var(--accent)'}}>$ </span><span className="t-cursor" style={{color:'var(--accent)'}}>█</span></span>}
                {rows.map((r,i)=>(
                  <div key={i}>
                    {r.cmd
                      ? <span><span style={{color:'var(--accent)'}}>$ </span><span style={{color:'#EDEDED'}}>{r.shown}</span></span>
                      : <span style={{color:'#4A4A4A'}}>{r.shown}</span>}
                    {i===rows.length-1 && <span style={{color:'var(--accent)',opacity:on?1:0}}>█</span>}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Stats — single row, no dot separator */}
        <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:1.3,duration:.7}}
          style={{ borderTop:'1px solid var(--border)', paddingTop:'clamp(20px,3vw,32px)', display:'flex', gap:'clamp(32px,7vw,96px)', flexWrap:'wrap', alignItems:'flex-end' }}>
          {[
            { val:String(p1).padStart(2,'0'), label:'Projects' },
            { val:p2+'+',                    label:'Yrs Experience' },
            { val:p3+'+',                    label:'Users Served' },
          ].map(s=>(
            <div key={s.label}>
              <div style={{ fontFamily:"'Instrument Serif',serif", fontSize:'clamp(2rem,5vw,3.2rem)', fontWeight:400, lineHeight:1, color:'var(--fg)', letterSpacing:'-.02em' }}>{s.val}</div>
              <div style={{ fontFamily:"'Geist Mono',monospace", fontSize:10, letterSpacing:'.18em', textTransform:'uppercase', color:'var(--fg-muted)', marginTop:6 }}>{s.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:2}} className="hidden md:flex"
          style={{ position:'absolute', right:0, bottom:0, flexDirection:'column', alignItems:'center', gap:8 }}>
          <span style={{ fontFamily:"'Geist Mono',monospace", fontSize:9, letterSpacing:'.3em', textTransform:'uppercase', color:'var(--fg-muted)', writingMode:'vertical-rl' }}>Scroll</span>
          <motion.div animate={{scaleY:[.4,1,.4]}} transition={{duration:1.6,repeat:Infinity,ease:'easeInOut'}}
            style={{width:1,height:40,background:'var(--border-hi)',transformOrigin:'top'}}/>
        </motion.div>
      </div>
    </section>
  )
}
