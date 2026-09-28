import { useCallback, useEffect, useRef, useState } from 'react'
import Lenis from 'lenis'
import Hero from './sections/Hero'
import Work from './sections/Work'
import { Numbers, Experience, Contact } from './sections/Rest'
import { Loader, Magnetic, Clock } from './components/Fx'

// A dot that grows over interactive things and shows a word ("View", "Write") where one is set.
function Cursor() {
  const ref = useRef(null), txt = useRef(null)
  useEffect(() => {
    const el = ref.current
    let x = -100, y = -100, cx = x, cy = y, raf
    const move = e => {
      x = e.clientX; y = e.clientY
      const hit = e.target.closest?.('a, button, [data-cursor]')
      const word = hit?.closest('[data-cursor]')?.getAttribute('data-cursor') || ''
      el.classList.toggle('big', !!hit)
      el.classList.toggle('word', !!word && word !== 'true' && word !== '')
      txt.current.textContent = word
    }
    const tick = () => { cx += (x - cx) * .2; cy += (y - cy) * .2; el.style.transform = `translate(${cx}px, ${cy}px)`; raf = requestAnimationFrame(tick) }
    window.addEventListener('pointermove', move); tick()
    return () => { window.removeEventListener('pointermove', move); cancelAnimationFrame(raf) }
  }, [])
  return <div className="cursor" ref={ref} aria-hidden="true"><span ref={txt} /></div>
}

// Weighted smooth scrolling; anchor links glide instead of jumping.
function useSmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const lenis = new Lenis({ lerp: .09, smoothWheel: true })
    let raf
    const loop = t => { lenis.raf(t); raf = requestAnimationFrame(loop) }
    raf = requestAnimationFrame(loop)
    const click = e => {
      const a = e.target.closest?.('a[href^="#"]')
      if (!a) return
      const el = document.querySelector(a.getAttribute('href'))
      if (el) { e.preventDefault(); lenis.scrollTo(el, { duration: 1.4 }) }
    }
    document.addEventListener('click', click)
    return () => { cancelAnimationFrame(raf); document.removeEventListener('click', click); lenis.destroy() }
  }, [])
}

export default function App() {
  const [ready, setReady] = useState(false)
  const done = useCallback(() => setReady(true), [])
  useSmoothScroll()
  return (
    <>
      <Loader onDone={done} />
      <Cursor />
      <header className="top pad">
        <a href="#top"><b>ASHISH RANJAN</b></a>
        <Clock />
        <nav aria-label="Sections">
          <Magnetic><a href="#work">Work</a></Magnetic>
          <Magnetic><a href="#experience">Experience</a></Magnetic>
          <Magnetic><a href="#contact">Contact</a></Magnetic>
        </nav>
      </header>
      <main>
        <Hero ready={ready} />
        <Work />
        <Numbers />
        <Experience />
        <Contact />
      </main>
    </>
  )
}
