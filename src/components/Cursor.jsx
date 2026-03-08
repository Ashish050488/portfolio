import { useEffect, useRef } from 'react'

export default function Cursor() {
  const dot  = useRef(null)
  const ring = useRef(null)

  useEffect(() => {
    let mx=0, my=0, rx=0, ry=0, raf
    const move = e => { mx=e.clientX; my=e.clientY }
    const tick = () => {
      rx += (mx-rx)*.13; ry += (my-ry)*.13
      dot.current.style.left   = mx+'px'; dot.current.style.top   = my+'px'
      ring.current.style.left  = rx+'px'; ring.current.style.top  = ry+'px'
      raf = requestAnimationFrame(tick)
    }
    const over = e => {
      const hit = e.target?.closest('a,button,input,textarea,select,[role=button]')
      dot.current.classList.toggle('on', !!hit)
      ring.current.classList.toggle('on', !!hit)
    }
    window.addEventListener('mousemove', move)
    document.addEventListener('mouseover', over)
    raf = requestAnimationFrame(tick)
    return () => {
      window.removeEventListener('mousemove', move)
      document.removeEventListener('mouseover', over)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <>
      <div ref={dot}  className="c-dot"  aria-hidden="true" />
      <div ref={ring} className="c-ring" aria-hidden="true" />
    </>
  )
}
