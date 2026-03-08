import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiGithub, FiLinkedin, FiMail, FiFileText } from 'react-icons/fi'
import ResumeFile from '../../assets/Ashish_Ranjan_SWE_Resume.pdf'

const FG   = '#EDEDED'
const MUT  = 'rgba(237,237,237,.45)'
const DIM  = 'rgba(237,237,237,.25)'
const LINE = 'rgba(237,237,237,.08)'
const INP  = { width:'100%', background:'transparent', border:'none', borderBottom:`1px solid ${LINE}`, color:FG, fontFamily:"'Geist',sans-serif", fontSize:'clamp(14px,1.5vw,15px)', padding:'14px 0', outline:'none', transition:'border-color .3s' }
const LBL  = { fontFamily:"'Geist Mono',monospace", fontSize:10, letterSpacing:'.2em', textTransform:'uppercase', color:DIM, display:'block', marginBottom:4 }

export default function Getintouch() {
  const [form,   setForm]   = useState({ name:'', email:'', message:'' })
  const [status, setStatus] = useState(null)
  const change = e => setForm(f=>({...f,[e.target.name]:e.target.value}))
  const focus  = e => { e.target.style.borderBottomColor='var(--accent)' }
  const blur   = e => { e.target.style.borderBottomColor=LINE }
  const submit = async e => {
    e.preventDefault(); setStatus('sending')
    try {
      const r = await fetch('https://formspree.io/f/mwprozwb',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(form)})
      if(r.ok){setStatus('success');setForm({name:'',email:'',message:''})} else throw new Error()
    } catch { setStatus('error') }
  }

  return (
    <section id="contact" style={{backgroundColor:'#0F0F0F',paddingTop:'var(--pad-y)',paddingBottom:'var(--pad-y)',paddingLeft:'var(--pad-x)',paddingRight:'var(--pad-x)'}}>
      <div style={{maxWidth:'var(--max-w)',margin:'0 auto'}}>

        <p style={{fontFamily:"'Geist Mono',monospace",fontSize:11,letterSpacing:'.25em',textTransform:'uppercase',color:DIM,display:'flex',alignItems:'center',gap:10,marginBottom:'clamp(32px,5vw,56px)'}}>
          <span style={{width:24,height:1,background:DIM,display:'block'}}/> Get in touch
        </p>

        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(min(100%,320px),1fr))',gap:'clamp(40px,7vw,96px)',alignItems:'start'}}>

          {/* LEFT */}
          <div>
            <div style={{overflow:'hidden',marginBottom:'clamp(28px,4vw,44px)'}}>
              <motion.h2 initial={{y:80,opacity:0}} whileInView={{y:0,opacity:1}} viewport={{once:true}} transition={{duration:.9,ease:[.76,0,.24,1]}}
                style={{fontFamily:"'Instrument Serif',serif",fontSize:'clamp(2.5rem,7vw,5rem)',fontWeight:400,lineHeight:1.1,color:FG}}>
                <span style={{fontStyle:'italic'}}>Let's build</span><br/>
                something<br/>
                <span style={{fontStyle:'italic'}}>great together<span style={{color:'var(--accent)'}}>.</span></span>
              </motion.h2>
            </div>
            <div style={{borderTop:`1px solid ${LINE}`,marginBottom:'clamp(24px,3vw,36px)'}}/>
            <form onSubmit={submit}>
              <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(140px,1fr))',gap:'0 clamp(16px,3vw,28px)',marginBottom:'clamp(20px,3vw,28px)'}}>
                <div><label style={LBL}>Name</label><input name="name" value={form.name} onChange={change} onFocus={focus} onBlur={blur} required placeholder="Your name" style={INP}/></div>
                <div><label style={LBL}>Email</label><input name="email" type="email" value={form.email} onChange={change} onFocus={focus} onBlur={blur} required placeholder="your@email.com" style={INP}/></div>
              </div>
              <div style={{marginBottom:'clamp(24px,3vw,36px)'}}>
                <label style={LBL}>Message</label>
                <textarea name="message" value={form.message} onChange={change} onFocus={focus} onBlur={blur} required rows={5} placeholder="Tell me about your project or idea..." style={{...INP,resize:'none',lineHeight:1.6}}/>
              </div>
              <button type="submit" disabled={status==='sending'}
                onMouseEnter={e=>{e.currentTarget.style.backgroundColor='var(--accent)';e.currentTarget.style.color='#0A0A0A';e.currentTarget.style.borderColor='var(--accent)'}}
                onMouseLeave={e=>{e.currentTarget.style.backgroundColor='transparent';e.currentTarget.style.color=FG;e.currentTarget.style.borderColor=LINE}}
                style={{width:'100%',padding:'15px 24px',border:`1px solid ${LINE}`,background:'transparent',color:FG,fontFamily:"'Geist Mono',monospace",fontSize:12,letterSpacing:'.15em',textTransform:'uppercase',transition:'all .3s ease',opacity:status==='sending'?.6:1}}>
                {status==='sending'?'Sending...':'Send Message \u2192'}
              </button>
              {status==='success' && <p style={{fontFamily:"'Geist Mono',monospace",fontSize:12,color:'#4ade80',marginTop:16}}>{'\u2713'} Sent. I'll get back to you shortly.</p>}
              {status==='error'   && <p style={{fontFamily:"'Geist Mono',monospace",fontSize:12,color:'#f87171',marginTop:16}}>Something went wrong. Try emailing directly.</p>}
            </form>
          </div>

          {/* RIGHT */}
          <div style={{paddingTop:'clamp(0px,2vw,16px)'}}>
            <p style={{fontFamily:"'Geist Mono',monospace",fontSize:10,letterSpacing:'.2em',textTransform:'uppercase',color:DIM,marginBottom:16}}>Find me on</p>
            {[
              {label:'GitHub',   href:'https://github.com/Ashish050488',          Icon:FiGithub  },
              {label:'LinkedIn', href:'https://linkedin.com/in/dev-ashishranjan', Icon:FiLinkedin},
              {label:'Email',    href:'mailto:ashishar050488@gmail.com',           Icon:FiMail    },
              {label:'Resume',   href:ResumeFile,                                  Icon:FiFileText},
            ].map(l=>(
              <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer"
                style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'14px 0',borderBottom:`1px solid ${LINE}`,textDecoration:'none',color:MUT,fontFamily:"'Geist',sans-serif",fontSize:14,transition:'color .25s'}}
                onMouseEnter={e=>e.currentTarget.style.color=FG}
                onMouseLeave={e=>e.currentTarget.style.color=MUT}>
                <span style={{display:'flex',alignItems:'center',gap:10}}><l.Icon size={14}/> {l.label}</span>
                <span style={{fontSize:12}}>{'\u2197'}</span>
              </a>
            ))}
            <div style={{marginTop:32}}>
              <p style={{fontFamily:"'Geist Mono',monospace",fontSize:10,letterSpacing:'.16em',textTransform:'uppercase',color:DIM,marginBottom:6}}>Response time</p>
              <p style={{fontFamily:"'Geist',sans-serif",fontSize:13,color:'rgba(237,237,237,.35)'}}>Usually within 24 hours.</p>
            </div>
            <div style={{marginTop:24}}>
              <p style={{fontFamily:"'Geist Mono',monospace",fontSize:10,letterSpacing:'.16em',textTransform:'uppercase',color:DIM,marginBottom:6}}>Education</p>
              <p style={{fontFamily:"'Geist Mono',monospace",fontSize:11,color:'rgba(237,237,237,.3)',lineHeight:1.6}}>B.Tech {'\u2014'} AI & Machine Learning<br/>LNCT, Bhopal {'\u00b7'} Graduating 2026</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
