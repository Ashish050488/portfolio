import { useState, useEffect } from 'react'

export default function ThemeToggle() {
  const [dark, setDark] = useState(true)

  useEffect(() => {
    const isDark = localStorage.getItem('theme') !== 'light'
    setDark(isDark)
    document.documentElement.classList.toggle('dark', isDark)
  }, [])

  const toggle = () => {
    const next = !dark
    setDark(next)
    localStorage.setItem('theme', next ? 'dark' : 'light')
    document.documentElement.classList.toggle('dark', next)
  }

  return (
    <button onClick={toggle} aria-label="Toggle theme" style={{
      position:'relative', width:40, height:22,
      borderRadius:11, border:'1px solid var(--border-hi)',
      background:'transparent', flexShrink:0,
    }}>
      <span style={{
        position:'absolute', top:3,
        left: dark ? 19 : 3,
        width:14, height:14, borderRadius:'50%',
        background: dark ? 'var(--accent)' : 'var(--fg-muted)',
        display:'block',
        transition:'left .3s cubic-bezier(.76,0,.24,1), background .3s',
      }}/>
    </button>
  )
}
