import { motion } from 'framer-motion'

const EXP = [
  {
    id:1, idx:'01', period:'Jun 2026 – Present',
    role:'Software Development Engineer — Livo Assistant', badge:'Current',
    company:'Chillspace Labs Pvt. Ltd. · Bengaluru, India',
    points:[
      'Architected and shipped a GST reconciliation engine from scratch — 2B matching, ITC carry-forward, versioned reconciliation history, and the full return lifecycle for a CA-firm compliance platform.',
      'Re-engineered Zoho Books ledger sync with paginated ingestion, watermark-based incremental sync, retry/backoff, and per-account failure isolation; raised the account-fetch ceiling from 200 to 5,000 and eliminated silent data loss.',
      'Built and re-architected a full payroll platform into a versioned, non-destructive accept/reject/cancel lifecycle with validation, safe spreadsheet exports, and automated PDF/email outputs.',
      'Led application-security hardening across cross-tenant IDOR, XLSX formula injection, email-header injection, XSS and auth abuse; redesigned login throttling with separate DoS/brute-force controls backed by 60 automated tests.',
    ],
  },
  {
    id:2, idx:'02', period:'Jul 2025 – May 2026',
    role:'Software Engineer — Full Stack', badge:'Freelance',
    company:'englishjobsgermany.com · Remote · Germany Market',
    points:[
      'Re-architected a scraping pipeline across 9 ATS platforms and 2,853 job boards with SHA-256 change detection, dedup, safe expiry and MongoDB bulk writes — cutting runtime from a 45-min timeout to ~6 min, with 39/39 scheduled runs succeeding.',
      'Engineered production AI workflows with Gemini and Gemma for German-requirement classification, structured extraction and resume matching, with pre-LLM filtering, confidence-based review, multi-model fallback and quota management.',
      'Built end-to-end WhatsApp job-distribution automation with scheduled workflows and deduplication to deliver recurring job content and drive engagement.',
      'Shipped reliability work — MongoDB change-stream cache sync, indexed in-memory search, async resume parsing, cache warm-up — and shrank AI cache storage by 97.5% (87 MB → 2.2 MB).',
    ],
  },
  {
    id:3, idx:'03', period:'Apr 2025 – Jun 2025',
    role:'Software Engineer Intern — Full Stack', badge:null,
    company:'SniperThink · Remote, India',
    points:[
      'Rebuilt the PostgreSQL data layer and designed a Node.js/Express REST API with RBAC, resolving critical data-consistency failures and enforcing isolated Admin, Owner, and User access.',
    ],
  },
]

export default function Experience() {
  return (
    <section id="experience" style={{ backgroundColor:'var(--bg)' }}>
      <div style={{ paddingTop:'var(--pad-y)', paddingBottom:'var(--pad-y)', paddingLeft:'var(--pad-x)', paddingRight:'var(--pad-x)', maxWidth:'var(--max-w)', margin:'0 auto' }}>

        <motion.p initial={{opacity:0}} whileInView={{opacity:1}} viewport={{once:true}} transition={{duration:.6}}
          style={{ fontFamily:"'Geist Mono',monospace", fontSize:11, letterSpacing:'.25em', textTransform:'uppercase', color:'var(--fg-muted)', display:'flex', alignItems:'center', gap:10, marginBottom:20 }}>
          <span style={{width:24,height:1,background:'var(--fg-muted)',display:'block',flexShrink:0}}/> Experience
        </motion.p>

        <div style={{overflow:'hidden',marginBottom:'clamp(32px,5vw,64px)'}}>
          <motion.h2 initial={{y:80,opacity:0}} whileInView={{y:0,opacity:1}} viewport={{once:true}} transition={{duration:.9,ease:[.76,0,.24,1]}}
            style={{ fontFamily:"'Instrument Serif',serif", fontStyle:'italic', fontSize:'clamp(2rem,5vw,3.5rem)', fontWeight:400, lineHeight:1.1, color:'var(--fg)' }}>
            A quick look at my<br/>professional journey.
          </motion.h2>
        </div>

        {EXP.map((e,i)=>(
          <motion.article key={e.id}
            initial={{opacity:0,y:32}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.1}} transition={{duration:.7,delay:i*.1}}
            style={{ borderTop:'1px solid var(--border)', padding:'clamp(24px,4vw,44px) 0', display:'grid', gridTemplateColumns:'clamp(80px,12vw,130px) 1fr', gap:'clamp(16px,4vw,48px)', position:'relative' }}
          >
            <div>
              <div style={{fontFamily:"'Geist Mono',monospace",fontSize:11,color:'var(--fg-muted)',letterSpacing:'.1em',marginBottom:8}}>{e.idx}</div>
              <div style={{fontFamily:"'Geist Mono',monospace",fontSize:10,color:'var(--fg-dim)',lineHeight:1.5}}>{e.period}</div>
            </div>
            <div>
              <div style={{display:'flex',alignItems:'baseline',gap:10,flexWrap:'wrap',marginBottom:4}}>
                <h3 style={{fontFamily:"'Instrument Serif',serif",fontSize:'clamp(1.1rem,2.8vw,1.6rem)',fontWeight:400,color:'var(--fg)',lineHeight:1.2}}>{e.role}</h3>
                {e.badge && <span style={{fontFamily:"'Geist Mono',monospace",fontSize:10,letterSpacing:'.12em',textTransform:'uppercase',color:'var(--accent)',border:'1px solid var(--accent)',padding:'2px 7px',borderRadius:99}}>{e.badge}</span>}
              </div>
              <p style={{fontFamily:"'Geist Mono',monospace",fontSize:11,color:'var(--fg-muted)',marginBottom:20,letterSpacing:'.04em'}}>{e.company}</p>
              <ul style={{listStyle:'none',display:'flex',flexDirection:'column',gap:10}}>
                {e.points.map((pt,j)=>(
                  <motion.li key={j} initial={{opacity:0,x:-16}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{delay:.1+j*.07}}
                    style={{display:'flex',gap:10,fontFamily:"'Geist',sans-serif",fontSize:'clamp(13px,1.4vw,14.5px)',lineHeight:1.65,color:'var(--fg-muted)'}}>
                    <span style={{color:'var(--accent)',flexShrink:0,marginTop:2}}>→</span>
                    <span>{pt}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
            <motion.div initial={{scaleY:0}} whileHover={{scaleY:1}}
              style={{position:'absolute',left:-2,top:0,bottom:0,width:2,background:'var(--accent)',transformOrigin:'top'}}/>
          </motion.article>
        ))}

      </div>
    </section>
  )
}
