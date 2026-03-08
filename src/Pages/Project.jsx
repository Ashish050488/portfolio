import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FiGithub, FiExternalLink } from 'react-icons/fi'

const PROJECTS = [
  {
    id:1, idx:'01', year:'2026',
    title:'ProxyClaw', sub:'AI Agent Deployment SaaS',
    live:'https://proxyclaw.xyz', github:null, live_badge:true,
    tech:'React 19 \u00b7 Node.js \u00b7 Docker \u00b7 WebSockets \u00b7 TanStack Query \u00b7 Zustand',
    desc:'A live SaaS platform for deploying AI agents \u2014 co-engineered the backend with Docker-based orchestration covering deployments, billing, and infrastructure.',
    study:{ problem:'Deploying AI agents required deep infrastructure knowledge, creating a high barrier for non-technical teams.', approach:'Built production-grade API security (rate limiting, Helmet, CORS), Docker orchestration, WebSocket handling, and a React 19 frontend with real-time workflows.', impact:'Live SaaS product at proxyclaw.xyz serving real users with production-grade reliability.' },
  },
  {
    id:2, idx:'02', year:'2025',
    title:'CrunchGuardian', sub:'Crypto Wallet Analytics',
    live:'https://my-wallet-app-theta.vercel.app/', github:{Code:'https://github.com/Ashish050488/CrunchGuardian-AI'}, live_badge:false,
    tech:'React \u00b7 Node.js \u00b7 BitCrunch API \u00b7 TailwindCSS',
    desc:'A wallet analytics tracker for cryptocurrency investors to monitor and analyze wallet risk before a transaction.',
    study:{ problem:'Crypto investors had no easy way to assess wallet safety before sending funds.', approach:"Integrated BitCrunch's wallet analytics API to surface risk scores, transaction history, and behavioral patterns.", impact:"Users evaluate any wallet's risk profile in seconds before initiating transactions." },
  },
  {
    id:3, idx:'03', year:'2025',
    title:'DevSync', sub:'Developer Networking Platform',
    live:'http://16.171.132.28', github:{Frontend:'https://github.com/Ashish050488/DevSync-frontend',Backend:'https://github.com/Ashish050488/DevSync'}, live_badge:false,
    tech:'React \u00b7 Node.js \u00b7 TailwindCSS \u00b7 AWS EC2 \u00b7 WebSockets',
    desc:'A professional networking platform for developers to discover peers, manage connections, and chat in real-time.',
    study:{ problem:'Developers lacked a dedicated platform to find peers based on tech stack and collaboration potential.', approach:'Built a MERN-stack platform with real-time WebSocket chat, connection management, and developer profiles on AWS EC2.', impact:'A networking space where developers can discover peers and collaborate through real-time messaging.' },
  },
]

const FG   = '#EDEDED'
const MUT  = 'rgba(237,237,237,.45)'
const DIM  = 'rgba(237,237,237,.25)'
const LINE = 'rgba(237,237,237,.08)'

export default function Project() {
  const [open, setOpen] = useState(null)

  return (
    <section id="projects" style={{ backgroundColor:'#0F0F0F', paddingTop:'var(--pad-y)', paddingBottom:'var(--pad-y)', paddingLeft:'var(--pad-x)', paddingRight:'var(--pad-x)' }}>
      <div style={{ maxWidth:'var(--max-w)', margin:'0 auto' }}>

        <div style={{display:'flex',alignItems:'flex-end',justifyContent:'space-between',flexWrap:'wrap',gap:16,marginBottom:'clamp(32px,5vw,64px)'}}>
          <div>
            <p style={{fontFamily:"'Geist Mono',monospace",fontSize:11,letterSpacing:'.25em',textTransform:'uppercase',color:DIM,display:'flex',alignItems:'center',gap:10,marginBottom:16}}>
              <span style={{width:24,height:1,background:DIM,display:'block'}}/> Selected Work
            </p>
            <h2 style={{fontFamily:"'Instrument Serif',serif",fontStyle:'italic',fontSize:'clamp(2.5rem,8vw,5.5rem)',fontWeight:400,lineHeight:.95,color:FG,letterSpacing:'-.02em'}}>
              Projects<span style={{color:'var(--accent)'}}>.</span>
            </h2>
          </div>
          <span style={{fontFamily:"'Geist Mono',monospace",fontSize:12,color:DIM,alignSelf:'flex-end',paddingBottom:8}}>[ 03 ]</span>
        </div>

        {PROJECTS.map(p=>(
          <div key={p.id} style={{borderTop:`1px solid ${LINE}`,padding:'clamp(24px,4vw,44px) 0'}}>

            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:12}}>
              <span style={{fontFamily:"'Geist Mono',monospace",fontSize:11,color:DIM,letterSpacing:'.1em'}}>{p.idx}</span>
              <div style={{display:'flex',alignItems:'center',gap:12}}>
                {p.live_badge && (
                  <span style={{fontFamily:"'Geist Mono',monospace",fontSize:10,letterSpacing:'.12em',textTransform:'uppercase',color:'var(--accent)',border:'1px solid rgba(212,255,0,.3)',padding:'3px 8px',borderRadius:99,display:'flex',alignItems:'center',gap:5}}>
                    <span style={{width:5,height:5,borderRadius:'50%',background:'var(--accent)',display:'inline-block'}}/> LIVE
                  </span>
                )}
                <a href={p.live} target="_blank" rel="noopener noreferrer"
                  style={{fontFamily:"'Geist Mono',monospace",fontSize:11,color:DIM,textDecoration:'none',display:'flex',alignItems:'center',gap:4}}
                  onMouseEnter={e=>e.currentTarget.style.color=FG}
                  onMouseLeave={e=>e.currentTarget.style.color=DIM}>
                  {p.year} <FiExternalLink size={12}/>
                </a>
              </div>
            </div>

            <h3
              style={{fontFamily:"'Instrument Serif',serif",fontSize:'clamp(1.8rem,5vw,3.5rem)',fontWeight:400,fontStyle:'italic',color:FG,lineHeight:1.05,marginBottom:8,letterSpacing:'-.01em',transition:'font-style .3s'}}
              onMouseEnter={e=>e.currentTarget.style.fontStyle='normal'}
              onMouseLeave={e=>e.currentTarget.style.fontStyle='italic'}
            >{p.title}</h3>

            <p style={{fontFamily:"'Geist Mono',monospace",fontSize:11,color:DIM,marginBottom:14,letterSpacing:'.06em'}}>{p.sub}</p>
            <p style={{fontFamily:"'Geist',sans-serif",fontSize:'clamp(13px,1.5vw,15px)',lineHeight:1.7,color:MUT,maxWidth:640,marginBottom:14}}>{p.desc}</p>
            <p style={{fontFamily:"'Geist Mono',monospace",fontSize:11,color:DIM,marginBottom:18}}>{p.tech}</p>

            <div style={{display:'flex',gap:20,flexWrap:'wrap',marginBottom:14}}>
              {p.github && Object.entries(p.github).map(([label,url])=>(
                <a key={label} href={url} target="_blank" rel="noopener noreferrer"
                  style={{fontFamily:"'Geist Mono',monospace",fontSize:11,color:MUT,textDecoration:'none',display:'flex',alignItems:'center',gap:5}}
                  onMouseEnter={e=>e.currentTarget.style.color=FG}
                  onMouseLeave={e=>e.currentTarget.style.color=MUT}>
                  <FiGithub size={13}/> {label}
                </a>
              ))}
            </div>

            <button onClick={()=>setOpen(open===p.id?null:p.id)}
              style={{fontFamily:"'Geist Mono',monospace",fontSize:11,letterSpacing:'.1em',color:DIM,background:'none',border:'none',padding:0,transition:'color .25s'}}
              onMouseEnter={e=>e.currentTarget.style.color='var(--accent)'}
              onMouseLeave={e=>e.currentTarget.style.color=DIM}>
              {open===p.id ? '\u2212 CASE STUDY' : '+ CASE STUDY'}
            </button>

            <AnimatePresence>
              {open===p.id && (
                <motion.div initial={{height:0,opacity:0}} animate={{height:'auto',opacity:1}} exit={{height:0,opacity:0}} transition={{duration:.35}} style={{overflow:'hidden'}}>
                  <div style={{marginTop:24,paddingTop:24,borderTop:`1px solid ${LINE}`,display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(180px,1fr))',gap:24}}>
                    {[['Problem',p.study.problem],['Approach',p.study.approach],['Impact',p.study.impact]].map(([k,v])=>(
                      <div key={k}>
                        <div style={{fontFamily:"'Geist Mono',monospace",fontSize:10,letterSpacing:'.18em',textTransform:'uppercase',color:'var(--accent)',marginBottom:8}}>{k}</div>
                        <p style={{fontFamily:"'Geist',sans-serif",fontSize:13,lineHeight:1.65,color:MUT}}>{v}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  )
}
