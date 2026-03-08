import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ThemeToggle from './ThemeToggle'

const LINKS = [
  { label:'Home',       id:'hero'       },
  { label:'Work',       id:'projects'   },
  { label:'Experience', id:'experience' },
  { label:'Contact',    id:'contact'    },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [active,   setActive]   = useState('hero')
  const [open,     setOpen]     = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive:true })
    const obs = new IntersectionObserver(
      es => es.forEach(e => { if (e.isIntersecting) setActive(e.target.id) }),
      { threshold: 0.3 }
    )
    LINKS.forEach(l => { const el = document.getElementById(l.id); if(el) obs.observe(el) })
    return () => { window.removeEventListener('scroll', onScroll); obs.disconnect() }
  }, [])

  const go = id => {
    document.getElementById(id)?.scrollIntoView({ behavior:'smooth' })
    setOpen(false)
  }

  return (
    <>
      <nav style={{
        position:'fixed', top:0, left:0, right:0, zIndex:1000, height:64,
        display:'flex', alignItems:'center', justifyContent:'space-between',
        padding:'0 clamp(20px,5vw,80px)',
        backgroundColor: scrolled ? 'var(--bg)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
        transition:'background-color .4s, border-color .4s',
      }}>
        <button onClick={()=>go('hero')} style={{ fontFamily:"'Instrument Serif',serif", fontStyle:'italic', fontSize:20, color:'var(--fg)', background:'none', border:'none', letterSpacing:'-.01em' }}>AR</button>

        <div className="hidden md:flex" style={{ alignItems:'center', gap:32 }}>
          {LINKS.map(l => (
            <button key={l.id} onClick={()=>go(l.id)} style={{
              fontFamily:"'Geist Mono',monospace", fontSize:11, letterSpacing:'.13em',
              textTransform:'uppercase', background:'none', border:'none', paddingBottom:4,
              color: active===l.id ? 'var(--fg)' : 'var(--fg-muted)',
              position:'relative', transition:'color .3s',
            }}>
              {l.label}
              {active===l.id && (
                <motion.span layoutId="nav-dot" style={{ position:'absolute', bottom:-2, left:'50%', transform:'translateX(-50%)', width:4, height:4, borderRadius:'50%', background:'var(--accent)', display:'block' }}/>
              )}
            </button>
          ))}
          <ThemeToggle />
        </div>

        <div className="flex md:hidden" style={{ alignItems:'center', gap:16 }}>
          <ThemeToggle />
          <button onClick={()=>setOpen(o=>!o)} style={{ background:'none', border:'none', color:'var(--fg)', fontSize:22, lineHeight:1, padding:4 }} aria-label="Menu">{open?'✕':'☰'}</button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
            style={{ position:'fixed', inset:0, zIndex:999, backgroundColor:'var(--bg)', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:40 }}>
            {LINKS.map((l,i) => (
              <motion.button key={l.id} onClick={()=>go(l.id)}
                initial={{opacity:0,y:24}} animate={{opacity:1,y:0}} transition={{delay:i*.08}}
                style={{ fontFamily:"'Instrument Serif',serif", fontStyle:'italic', fontSize:36, color:'var(--fg)', background:'none', border:'none' }}>
                {l.label}
              </motion.button>
            ))}
            <ThemeToggle />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
