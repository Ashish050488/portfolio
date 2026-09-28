import { useEffect, useRef } from 'react'

// Monochrome generative artwork, one per project, each drawn from what the product does.
const ART = {
  // Thousands of listings; a scan line finds and lights them up.
  jobmesh(ctx, w, h, t) {
    const gap = Math.max(14, w / 48)
    const scan = ((t * .12) % 1.4 - .2) * w
    for (let x = gap / 2; x < w; x += gap) for (let y = gap / 2; y < h; y += gap) {
      const d = Math.abs(x - scan)
      const n = Math.sin(x * .05 + y * .08) * .5 + .5
      const lit = Math.max(0, 1 - d / (w * .12)) * (n > .45 ? 1 : .3)
      ctx.fillStyle = `rgba(242,242,240,${.12 + lit * .88})`
      const r = 1.1 + lit * 2.2
      ctx.beginPath(); ctx.arc(x, y, r, 0, 7); ctx.fill()
    }
  },
  // A flow of fine lines streaming through a filter.
  ejg(ctx, w, h, t) {
    ctx.lineWidth = 1
    for (let i = 0; i < 70; i++) {
      const y0 = (i / 70) * h
      ctx.strokeStyle = `rgba(242,242,240,${.08 + (i % 7 === 0 ? .5 : .12)})`
      ctx.beginPath()
      for (let x = 0; x <= w; x += 8) {
        const k = x / w
        const squeeze = 1 - .6 * Math.exp(-((k - .5) ** 2) / .02)
        const y = h / 2 + (y0 - h / 2) * squeeze + Math.sin(k * 9 + t * .9 + i * .3) * 6 * squeeze
        x ? ctx.lineTo(x, y) : ctx.moveTo(x, y)
      }
      ctx.stroke()
    }
  },
  // Containers stacking and pulsing as agents deploy.
  proxyclaw(ctx, w, h, t) {
    const s = Math.min(w, h) / 9, cx = w / 2, cy = h / 2 + s
    const box = (x, y, z, a) => {
      const px = cx + (x - y) * s * .87, py = cy + (x + y) * s * .5 - z * s
      ctx.strokeStyle = `rgba(242,242,240,${a})`; ctx.fillStyle = `rgba(242,242,240,${a * .08})`
      ctx.beginPath()
      ctx.moveTo(px, py - s); ctx.lineTo(px + s * .87, py - s * .5); ctx.lineTo(px + s * .87, py + s * .5)
      ctx.lineTo(px, py + s); ctx.lineTo(px - s * .87, py + s * .5); ctx.lineTo(px - s * .87, py - s * .5); ctx.closePath()
      ctx.fill(); ctx.stroke()
      ctx.beginPath(); ctx.moveTo(px - s * .87, py - s * .5); ctx.lineTo(px, py); ctx.lineTo(px + s * .87, py - s * .5); ctx.moveTo(px, py); ctx.lineTo(px, py + s); ctx.stroke()
    }
    for (let x = -1; x <= 1; x++) for (let y = -1; y <= 1; y++) {
      const i = (x + 1) * 3 + (y + 1)
      const z = Math.max(0, Math.sin(t * .8 - i * .6)) * 1.2
      box(x, y, z, .25 + z * .5)
    }
  },
  // Concentric rings sweeping like a risk radar.
  crunch(ctx, w, h, t) {
    const cx = w / 2, cy = h / 2, R = Math.min(w, h) * .44
    ctx.lineWidth = 1
    for (let i = 1; i <= 7; i++) {
      ctx.strokeStyle = `rgba(242,242,240,${.08 + i * .02})`
      ctx.beginPath(); ctx.arc(cx, cy, R * i / 7, 0, 7); ctx.stroke()
    }
    const a = t * .7
    const g = ctx.createConicGradient ? ctx.createConicGradient(a, cx, cy) : null
    if (g) {
      g.addColorStop(0, 'rgba(242,242,240,.35)'); g.addColorStop(.12, 'rgba(242,242,240,0)'); g.addColorStop(1, 'rgba(242,242,240,0)')
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, cy, R, 0, 7); ctx.fill()
    }
    for (let i = 0; i < 26; i++) {
      const ang = i * 2.39996, rr = R * (.2 + ((i * 37) % 80) / 100)
      const since = ((a - ang) % 6.283 + 6.283) % 6.283
      ctx.fillStyle = `rgba(242,242,240,${.15 + .85 * Math.max(0, 1 - since / 2)})`
      ctx.beginPath(); ctx.arc(cx + Math.cos(ang) * rr, cy + Math.sin(ang) * rr, 2.4, 0, 7); ctx.fill()
    }
  },
  // People as nodes, connections forming when they come close.
  devsync(ctx, w, h, t, st) {
    if (!st.p) st.p = Array.from({ length: 46 }, (_, i) => ({ x: (i * 97) % w, y: (i * 53) % h, a: i * 1.7 }))
    for (const p of st.p) { p.x = (p.x + Math.cos(p.a + t * .2) * .4 + w) % w; p.y = (p.y + Math.sin(p.a + t * .3) * .4 + h) % h }
    const lim = Math.min(w, h) * .22
    ctx.lineWidth = 1
    for (let i = 0; i < st.p.length; i++) for (let j = i + 1; j < st.p.length; j++) {
      const a = st.p[i], b = st.p[j], d = Math.hypot(a.x - b.x, a.y - b.y)
      if (d < lim) { ctx.strokeStyle = `rgba(242,242,240,${(1 - d / lim) * .45})`; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke() }
    }
    ctx.fillStyle = '#F2F2F0'
    for (const p of st.p) { ctx.beginPath(); ctx.arc(p.x, p.y, 2.2, 0, 7); ctx.fill() }
  },
}

export default function Cover({ kind }) {
  const ref = useRef(null)
  useEffect(() => {
    const cv = ref.current, ctx = cv.getContext('2d'), st = {}
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let w = 0, h = 0, raf, on = false
    const size = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = cv.clientWidth; h = cv.clientHeight
      cv.width = w * dpr; cv.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    const draw = now => {
      ctx.clearRect(0, 0, w, h)
      ART[kind](ctx, w, h, reduce ? 4 : now / 1000, st)
    }
    const loop = now => { draw(now); if (on && !reduce) raf = requestAnimationFrame(loop) }
    size(); draw(4000)
    const ro = new ResizeObserver(() => { size(); draw(performance.now()) }); ro.observe(cv)
    const io = new IntersectionObserver(([e]) => {
      on = e.isIntersecting
      cancelAnimationFrame(raf)
      if (on) raf = requestAnimationFrame(loop)
    })
    io.observe(cv)
    return () => { cancelAnimationFrame(raf); ro.disconnect(); io.disconnect() }
  }, [kind])
  return <canvas ref={ref} aria-hidden="true" />
}
