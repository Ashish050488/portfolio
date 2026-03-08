import { useRef } from 'react'
import { motion } from 'framer-motion'
import { FaReact, FaNodeJs, FaGitAlt, FaDocker, FaAws } from 'react-icons/fa'
import { SiTypescript, SiPostgresql, SiTailwindcss } from 'react-icons/si'

const TECH = [
  { name:'React',       Icon:FaReact       },
  { name:'TypeScript',  Icon:SiTypescript  },
  { name:'Node.js',     Icon:FaNodeJs      },
  { name:'PostgreSQL',  Icon:SiPostgresql  },
  { name:'TailwindCSS', Icon:SiTailwindcss },
  { name:'Docker',      Icon:FaDocker      },
  { name:'AWS',         Icon:FaAws         },
  { name:'Git',         Icon:FaGitAlt      },
]

function Item({ name, Icon }) {
  const wrapRef = useRef(null)
  const over  = () => { if(!wrapRef.current) return; const [ico,txt]=wrapRef.current.children; ico.style.color='var(--accent)'; txt.style.color='var(--fg)' }
  const out   = () => { if(!wrapRef.current) return; const [ico,txt]=wrapRef.current.children; ico.style.color='var(--fg-muted)'; txt.style.color='var(--fg-muted)' }
  return (
    <div ref={wrapRef} onMouseEnter={over} onMouseLeave={out}
      style={{display:'flex',flexDirection:'column',alignItems:'center',gap:10,width:110,flexShrink:0,padding:'0 16px'}}>
      <span style={{fontSize:28,color:'var(--fg-muted)',transition:'color .3s',display:'flex',alignItems:'center',lineHeight:1}}><Icon/></span>
      <span style={{fontFamily:"'Geist Mono',monospace",fontSize:10,letterSpacing:'.14em',textTransform:'uppercase',color:'var(--fg-muted)',transition:'color .3s',whiteSpace:'nowrap'}}>{name}</span>
    </div>
  )
}

export default function TechStack() {
  return (
    <section id="tech" style={{backgroundColor:'var(--bg)'}}>

      {/* Header block */}
      <div style={{maxWidth:'var(--max-w)',margin:'0 auto',paddingLeft:'var(--pad-x)',paddingRight:'var(--pad-x)',paddingTop:'var(--pad-y)'}}>
        <div style={{borderTop:'1px solid var(--border)',paddingTop:'clamp(24px,4vw,40px)'}}>
          <motion.p
            initial={{opacity:0}} whileInView={{opacity:1}} viewport={{once:true}}
            style={{fontFamily:"'Geist Mono',monospace",fontSize:11,letterSpacing:'.25em',textTransform:'uppercase',color:'var(--fg-muted)',display:'flex',alignItems:'center',gap:10,marginBottom:16}}>
            <span style={{width:24,height:1,background:'var(--fg-muted)',display:'block'}}/>
            08 Technologies
          </motion.p>
          <div style={{overflow:'hidden',marginBottom:8}}>
            <motion.h2
              initial={{y:60,opacity:0}} whileInView={{y:0,opacity:1}}
              viewport={{once:true}} transition={{duration:.9,ease:[.76,0,.24,1]}}
              style={{fontFamily:"'Instrument Serif',serif",fontStyle:'italic',fontSize:'clamp(2rem,5vw,3.5rem)',fontWeight:400,color:'var(--fg)'}}>
              Technologies.
            </motion.h2>
          </div>
          <p style={{fontFamily:"'Geist',sans-serif",fontSize:'clamp(13px,1.5vw,15px)',color:'var(--fg-muted)',marginBottom:'clamp(24px,4vw,40px)'}}>
            Tools I reach for, every single day.
          </p>
        </div>
        <div style={{borderBottom:'1px solid var(--border)'}}/>
      </div>

      {/* Marquee */}
      <div className="mq-wrap" style={{overflow:'hidden',paddingTop:'clamp(24px,3vw,36px)',paddingBottom:'clamp(24px,3vw,36px)'}}>
        <div className="mq-inner">
          {[...TECH,...TECH,...TECH,...TECH].map((t,i)=><Item key={i} name={t.name} Icon={t.Icon}/>)}
        </div>
      </div>

      {/* Quote + bottom padding */}
      <motion.div
        initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}}
        viewport={{once:true}} transition={{duration:.7}}
        style={{maxWidth:'var(--max-w)',margin:'0 auto',paddingLeft:'var(--pad-x)',paddingRight:'var(--pad-x)',paddingTop:'clamp(24px,4vw,40px)',paddingBottom:'var(--pad-y)',textAlign:'center'}}>
        <p style={{fontFamily:"'Instrument Serif',serif",fontStyle:'italic',fontSize:'clamp(1.1rem,3vw,1.6rem)',color:'var(--fg-muted)',lineHeight:1.5}}>
          "Building with purpose. Shipping with precision."
        </p>
      </motion.div>
    </section>
  )
}
