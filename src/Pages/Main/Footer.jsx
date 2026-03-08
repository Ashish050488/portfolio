import ResumeFile from '../../assets/Ashish_Ranjan_SWE_Resume.pdf'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer style={{borderTop:'1px solid var(--border)',backgroundColor:'var(--bg)',paddingTop:'clamp(20px,3vw,32px)',paddingBottom:'clamp(20px,3vw,32px)',paddingLeft:'var(--pad-x)',paddingRight:'var(--pad-x)'}}>
      <div style={{maxWidth:'var(--max-w)',margin:'0 auto'}}>
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap',gap:16}}>
          <span style={{fontFamily:"'Geist Mono',monospace",fontSize:11,color:'var(--fg-muted)',letterSpacing:'.05em'}}>{'\u00a9'} {year} Ashish Ranjan</span>
          <div style={{display:'flex',alignItems:'center',gap:7}}>
            <span className="avail-dot" style={{width:6,height:6}}/>
            <span style={{fontFamily:"'Geist Mono',monospace",fontSize:10,letterSpacing:'.16em',textTransform:'uppercase',color:'var(--fg-muted)'}}>Open to work</span>
          </div>
          <nav style={{display:'flex',gap:20,flexWrap:'wrap'}}>
            {[
              {label:'GitHub',   href:'https://github.com/Ashish050488'},
              {label:'LinkedIn', href:'https://linkedin.com/in/dev-ashishranjan'},
              {label:'Resume',   href:ResumeFile},
            ].map(l=>(
              <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer"
                style={{fontFamily:"'Geist Mono',monospace",fontSize:11,color:'var(--fg-muted)',textDecoration:'none',letterSpacing:'.06em',transition:'color .25s'}}
                onMouseEnter={e=>e.currentTarget.style.color='var(--fg)'}
                onMouseLeave={e=>e.currentTarget.style.color='var(--fg-muted)'}>{l.label}</a>
            ))}
          </nav>
        </div>
        <div style={{textAlign:'center',marginTop:12}}>
          <span style={{fontFamily:"'Geist Mono',monospace",fontSize:10,color:'var(--fg-dim)',letterSpacing:'.1em'}}>Designed &amp; built with obsessive care.</span>
        </div>
      </div>
    </footer>
  )
}
