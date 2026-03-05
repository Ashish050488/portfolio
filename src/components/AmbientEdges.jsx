import { useEffect, useRef } from "react"

/* ── Toggle true to make edges ultra-visible for debugging ── */
const DEBUG_EDGES = false

/* ══════════════════════════════════════════════
   SHARED: canvas setup, theme detection, resize
   ══════════════════════════════════════════════ */

function setupCanvas(canvas, container) {
  const dpr = Math.min(window.devicePixelRatio || 1, 2)
  const rect = container.getBoundingClientRect()
  const w = Math.round(rect.width)
  const h = Math.round(rect.height)
  canvas.width = w * dpr
  canvas.height = h * dpr
  canvas.style.width = w + "px"
  canvas.style.height = h + "px"
  const ctx = canvas.getContext("2d")
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  return { ctx, w, h }
}

function getBase(dark) {
  return dark ? "255,255,255" : "0,0,0"
}

function getBg(dark) {
  return dark ? "10,10,10" : "255,255,255"
}

/* ══════════════════════════════════════════════
   LEFT CANVAS: Git Commit Constellation
   ══════════════════════════════════════════════ */

function generateGraph(w, h) {
  // Build a branching commit graph with 22-28 nodes
  const nodes = []
  const edges = []
  const lanes = [0.3, 0.55, 0.8] // x positions as fractions of width

  const nodeCount = 22 + Math.floor(Math.random() * 7)
  const spacing = h / (nodeCount + 1)

  let currentLane = 0
  for (let i = 0; i < nodeCount; i++) {
    const y = spacing * (i + 1)
    // Occasionally branch or merge
    if (i > 2 && Math.random() < 0.18) {
      currentLane = (currentLane + (Math.random() < 0.5 ? 1 : -1) + lanes.length) % lanes.length
    }
    const jitter = (Math.random() - 0.5) * w * 0.08
    const x = w * lanes[currentLane] + jitter
    nodes.push({ x, y, lane: currentLane, radius: 2.5 + Math.random() * 1.5, phase: Math.random() * Math.PI * 2 })
    if (i > 0) {
      edges.push({ from: i - 1, to: i })
      // Occasional branch edge from a few nodes back
      if (i > 3 && Math.random() < 0.12) {
        edges.push({ from: i - 2 - Math.floor(Math.random() * 2), to: i })
      }
    }
  }
  return { nodes, edges }
}

function GitCanvas() {
  const containerRef = useRef(null)
  const canvasRef = useRef(null)
  const rafRef = useRef(null)
  const timeRef = useRef(0)
  const lastFrameRef = useRef(0)
  const isDarkRef = useRef(false)
  const scrollYRef = useRef(0)
  const graphRef = useRef(null)
  const sizeRef = useRef({ w: 0, h: 0 })
  // Pulses traveling along edges
  const pulsesRef = useRef([])

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    let ctx, w, h
    function resize() {
      const s = setupCanvas(canvas, container)
      ctx = s.ctx; w = s.w; h = s.h
      sizeRef.current = { w, h }
      graphRef.current = generateGraph(w, h)
      pulsesRef.current = []
      if (prefersReduced) drawStatic()
    }

    function drawStatic() {
      isDarkRef.current = document.documentElement.classList.contains("dark")
      const base = getBase(isDarkRef.current)
      const g = graphRef.current
      if (!g) return
      ctx.clearRect(0, 0, w, h)
      // Draw edges
      ctx.lineWidth = 1
      for (const e of g.edges) {
        const a = g.nodes[e.from], b = g.nodes[e.to]
        ctx.beginPath()
        ctx.moveTo(a.x, a.y)
        ctx.lineTo(b.x, b.y)
        ctx.strokeStyle = `rgba(${base}, 0.12)`
        ctx.stroke()
      }
      // Draw nodes
      for (const n of g.nodes) {
        ctx.beginPath()
        ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${base}, 0.18)`
        ctx.fill()
      }
    }

    resize()
    if (prefersReduced) return

    isDarkRef.current = document.documentElement.classList.contains("dark")
    const themeObs = new MutationObserver(() => {
      isDarkRef.current = document.documentElement.classList.contains("dark")
    })
    themeObs.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] })

    const onScroll = () => { scrollYRef.current = window.scrollY }
    window.addEventListener("scroll", onScroll, { passive: true })
    const onResize = () => resize()
    window.addEventListener("resize", onResize, { passive: true })

    function frame(ts) {
      if (!lastFrameRef.current) lastFrameRef.current = ts
      const delta = Math.min((ts - lastFrameRef.current) / 1000, 0.1)
      lastFrameRef.current = ts
      timeRef.current += delta

      const g = graphRef.current
      if (!g || w === 0) { rafRef.current = requestAnimationFrame(frame); return }

      const t = timeRef.current
      const dark = isDarkRef.current
      const base = getBase(dark)
      const bg = getBg(dark)
      const alphaScale = DEBUG_EDGES ? 2.5 : 1

      // Fade trails
      ctx.fillStyle = `rgba(${bg}, ${dark ? 0.08 : 0.1})`
      ctx.fillRect(0, 0, w, h)

      // Draw edges (thin connectors)
      ctx.lineCap = "round"
      for (const e of g.edges) {
        const a = g.nodes[e.from], b = g.nodes[e.to]
        ctx.beginPath()
        ctx.moveTo(a.x, a.y)
        ctx.lineTo(b.x, b.y)
        ctx.strokeStyle = `rgba(${base}, ${(0.10 * alphaScale).toFixed(3)})`
        ctx.lineWidth = DEBUG_EDGES ? 2 : 0.8
        ctx.stroke()
      }

      // Draw nodes with breathing effect
      for (const n of g.nodes) {
        const breathe = 1 + Math.sin(t * 1.2 + n.phase) * 0.18
        const r = n.radius * breathe
        const nodeAlpha = (0.22 + Math.sin(t * 0.8 + n.phase * 2) * 0.08) * alphaScale
        ctx.beginPath()
        ctx.arc(n.x, n.y, r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${base}, ${nodeAlpha.toFixed(3)})`
        ctx.fill()
        // Outer ring
        ctx.beginPath()
        ctx.arc(n.x, n.y, r + 2, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(${base}, ${(0.06 * alphaScale).toFixed(3)})`
        ctx.lineWidth = 0.5
        ctx.stroke()
      }

      // Spawn pulses (1-2 active at a time)
      const pulses = pulsesRef.current
      if (pulses.length < 2 && Math.random() < 0.015) {
        const edgeIdx = Math.floor(Math.random() * g.edges.length)
        pulses.push({ edge: edgeIdx, progress: 0, speed: 0.3 + Math.random() * 0.4 })
      }

      // Scroll influence: slightly vary pulse speed
      const scrollDelta = Math.abs(scrollYRef.current * 0.00004)

      // Draw and advance pulses
      for (let i = pulses.length - 1; i >= 0; i--) {
        const p = pulses[i]
        const e = g.edges[p.edge]
        const a = g.nodes[e.from], b = g.nodes[e.to]
        const px = a.x + (b.x - a.x) * p.progress
        const py = a.y + (b.y - a.y) * p.progress

        // Pulse glow
        const pulseAlpha = (0.5 + Math.sin(p.progress * Math.PI) * 0.3) * alphaScale
        ctx.beginPath()
        ctx.arc(px, py, DEBUG_EDGES ? 8 : 4, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${base}, ${pulseAlpha.toFixed(3)})`
        ctx.fill()

        // Trailing glow
        const trailAlpha = pulseAlpha * 0.4
        ctx.beginPath()
        ctx.arc(px, py, DEBUG_EDGES ? 14 : 8, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${base}, ${trailAlpha.toFixed(3)})`
        ctx.fill()

        // Bright line segment on the edge near pulse
        const seg = 0.08
        const s0 = Math.max(0, p.progress - seg), s1 = Math.min(1, p.progress + seg)
        ctx.beginPath()
        ctx.moveTo(a.x + (b.x - a.x) * s0, a.y + (b.y - a.y) * s0)
        ctx.lineTo(a.x + (b.x - a.x) * s1, a.y + (b.y - a.y) * s1)
        ctx.strokeStyle = `rgba(${base}, ${(0.35 * alphaScale).toFixed(3)})`
        ctx.lineWidth = DEBUG_EDGES ? 3 : 1.6
        ctx.stroke()

        p.progress += (p.speed + scrollDelta) * delta
        if (p.progress > 1) pulses.splice(i, 1)
      }

      rafRef.current = requestAnimationFrame(frame)
    }

    rafRef.current = requestAnimationFrame(frame)

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onResize)
      themeObs.disconnect()
    }
  }, [])

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "clamp(160px, 18vw, 320px)",
        height: "100vh",
        zIndex: 30,
        pointerEvents: "none",
        overflow: "hidden",
        outline: DEBUG_EDGES ? "2px solid red" : "none",
        background: DEBUG_EDGES ? "rgba(255,0,0,0.08)" : "none",
        maskImage: DEBUG_EDGES
          ? "none"
          : "linear-gradient(to right, rgba(0,0,0,1) 10%, rgba(0,0,0,0.8) 60%, transparent 92%)",
        WebkitMaskImage: DEBUG_EDGES
          ? "none"
          : "linear-gradient(to right, rgba(0,0,0,1) 10%, rgba(0,0,0,0.8) 60%, transparent 92%)",
      }}
      className="hidden md:block"
    >
      <canvas ref={canvasRef} style={{ display: "block", width: "100%", height: "100%" }} />
    </div>
  )
}

/* ══════════════════════════════════════════════
   RIGHT CANVAS: API Pulse Lanes
   ══════════════════════════════════════════════ */

function ApiCanvas() {
  const containerRef = useRef(null)
  const canvasRef = useRef(null)
  const rafRef = useRef(null)
  const timeRef = useRef(0)
  const lastFrameRef = useRef(0)
  const isDarkRef = useRef(false)
  const scrollYRef = useRef(0)
  const sizeRef = useRef({ w: 0, h: 0 })
  const packetsRef = useRef([])

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    let ctx, w, h
    // Lane x-positions (fractions of width)
    const lanePositions = [0.28, 0.52, 0.76]

    function resize() {
      const s = setupCanvas(canvas, container)
      ctx = s.ctx; w = s.w; h = s.h
      sizeRef.current = { w, h }
      packetsRef.current = []
      if (prefersReduced) drawStatic()
    }

    function drawStatic() {
      isDarkRef.current = document.documentElement.classList.contains("dark")
      const base = getBase(isDarkRef.current)
      ctx.clearRect(0, 0, w, h)
      for (const lx of lanePositions) {
        const x = lx * w
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, h)
        ctx.strokeStyle = `rgba(${base}, 0.08)`
        ctx.lineWidth = 0.8
        ctx.setLineDash([4, 8])
        ctx.stroke()
        ctx.setLineDash([])
      }
      // A few static "packets"
      for (let i = 0; i < 8; i++) {
        const lx = lanePositions[i % lanePositions.length]
        const x = lx * w
        const y = (h / 10) * (i + 1)
        ctx.fillStyle = `rgba(${base}, 0.12)`
        ctx.fillRect(x - 2, y, 4, 6)
      }
    }

    resize()
    if (prefersReduced) return

    isDarkRef.current = document.documentElement.classList.contains("dark")
    const themeObs = new MutationObserver(() => {
      isDarkRef.current = document.documentElement.classList.contains("dark")
    })
    themeObs.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] })

    const onScroll = () => { scrollYRef.current = window.scrollY }
    window.addEventListener("scroll", onScroll, { passive: true })
    const onResize = () => resize()
    window.addEventListener("resize", onResize, { passive: true })

    function frame(ts) {
      if (!lastFrameRef.current) lastFrameRef.current = ts
      const delta = Math.min((ts - lastFrameRef.current) / 1000, 0.1)
      lastFrameRef.current = ts
      timeRef.current += delta

      if (w === 0) { rafRef.current = requestAnimationFrame(frame); return }

      const t = timeRef.current
      const dark = isDarkRef.current
      const base = getBase(dark)
      const bg = getBg(dark)
      const alphaScale = DEBUG_EDGES ? 2.5 : 1

      // Fade
      ctx.fillStyle = `rgba(${bg}, ${dark ? 0.07 : 0.09})`
      ctx.fillRect(0, 0, w, h)

      // Draw lane lines (dashed, subtle)
      for (const lx of lanePositions) {
        const x = lx * w
        // Animated dash offset
        const dashOffset = (t * 20 + scrollYRef.current * 0.02) % 24
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, h)
        ctx.strokeStyle = `rgba(${base}, ${(0.08 * alphaScale).toFixed(3)})`
        ctx.lineWidth = DEBUG_EDGES ? 2 : 0.7
        ctx.setLineDash([4, 8])
        ctx.lineDashOffset = -dashOffset
        ctx.stroke()
        ctx.setLineDash([])

        // Subtle glow column behind lanes
        const grad = ctx.createLinearGradient(x - 12, 0, x + 12, 0)
        grad.addColorStop(0, `rgba(${base}, 0)`)
        grad.addColorStop(0.5, `rgba(${base}, ${(0.02 * alphaScale).toFixed(3)})`)
        grad.addColorStop(1, `rgba(${base}, 0)`)
        ctx.fillStyle = grad
        ctx.fillRect(x - 12, 0, 24, h)
      }

      const packets = packetsRef.current
      const scrollBoost = 1 + Math.abs(scrollYRef.current * 0.00003)

      // Spawn request packets going UP (main traffic)
      if (packets.length < 12 && Math.random() < 0.04) {
        const lane = Math.floor(Math.random() * lanePositions.length)
        packets.push({
          lane,
          y: h + 10,
          speed: -(60 + Math.random() * 80), // negative = upward
          size: 3 + Math.random() * 3,
          alpha: 0.25 + Math.random() * 0.15,
          isResponse: false,
          branched: false,
        })
      }

      // Draw + advance packets
      for (let i = packets.length - 1; i >= 0; i--) {
        const p = packets[i]
        const x = lanePositions[p.lane] * w
        p.y += p.speed * scrollBoost * delta

        const a = p.alpha * alphaScale

        // Packet body (short stroke / rectangle)
        ctx.fillStyle = `rgba(${base}, ${a.toFixed(3)})`
        const sz = DEBUG_EDGES ? p.size * 2 : p.size
        ctx.fillRect(x - sz * 0.4, p.y, sz * 0.8, sz * 1.5)

        // Leading glow
        const glowA = a * 0.5
        ctx.beginPath()
        ctx.arc(x, p.y + (p.speed < 0 ? 0 : sz * 1.5), DEBUG_EDGES ? 6 : 3, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${base}, ${glowA.toFixed(3)})`
        ctx.fill()

        // Trailing line
        const trailLen = Math.abs(p.speed) * 0.15
        ctx.beginPath()
        ctx.moveTo(x, p.y)
        ctx.lineTo(x, p.y + (p.speed < 0 ? trailLen : -trailLen))
        ctx.strokeStyle = `rgba(${base}, ${(a * 0.3).toFixed(3)})`
        ctx.lineWidth = DEBUG_EDGES ? 1.5 : 0.6
        ctx.stroke()

        // Rare: branch to adjacent lane
        if (!p.branched && !p.isResponse && Math.random() < 0.002 && p.y < h * 0.7 && p.y > h * 0.2) {
          p.branched = true
          const adjLane = (p.lane + (Math.random() < 0.5 ? 1 : -1) + lanePositions.length) % lanePositions.length
          // Draw branch arc
          const fromX = lanePositions[p.lane] * w
          const toX = lanePositions[adjLane] * w
          ctx.beginPath()
          ctx.moveTo(fromX, p.y)
          ctx.quadraticCurveTo((fromX + toX) / 2, p.y - 15, toX, p.y)
          ctx.strokeStyle = `rgba(${base}, ${(0.18 * alphaScale).toFixed(3)})`
          ctx.lineWidth = 0.6
          ctx.stroke()
        }

        // Spawn response packet (going DOWN) when request exits top
        if (!p.isResponse && p.y < -10) {
          if (Math.random() < 0.4) {
            packets.push({
              lane: p.lane,
              y: -10,
              speed: 40 + Math.random() * 50, // positive = downward
              size: 2 + Math.random() * 2,
              alpha: 0.15 + Math.random() * 0.1,
              isResponse: true,
              branched: false,
            })
          }
          packets.splice(i, 1)
          continue
        }

        // Remove if off screen
        if (p.y > h + 20 || p.y < -30) {
          packets.splice(i, 1)
        }
      }

      // Occasional "response burst" at top of a lane
      if (Math.random() < 0.008) {
        const lane = Math.floor(Math.random() * lanePositions.length)
        const x = lanePositions[lane] * w
        const burstAlpha = 0.25 * alphaScale
        ctx.beginPath()
        ctx.arc(x, 8, DEBUG_EDGES ? 10 : 5, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${base}, ${burstAlpha.toFixed(3)})`
        ctx.fill()
      }

      rafRef.current = requestAnimationFrame(frame)
    }

    rafRef.current = requestAnimationFrame(frame)

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onResize)
      themeObs.disconnect()
    }
  }, [])

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0,
        right: 0,
        width: "clamp(160px, 18vw, 320px)",
        height: "100vh",
        zIndex: 30,
        pointerEvents: "none",
        overflow: "hidden",
        outline: DEBUG_EDGES ? "2px solid red" : "none",
        background: DEBUG_EDGES ? "rgba(255,0,0,0.08)" : "none",
        maskImage: DEBUG_EDGES
          ? "none"
          : "linear-gradient(to left, rgba(0,0,0,1) 10%, rgba(0,0,0,0.8) 60%, transparent 92%)",
        WebkitMaskImage: DEBUG_EDGES
          ? "none"
          : "linear-gradient(to left, rgba(0,0,0,1) 10%, rgba(0,0,0,0.8) 60%, transparent 92%)",
      }}
      className="hidden md:block"
    >
      <canvas ref={canvasRef} style={{ display: "block", width: "100%", height: "100%" }} />
    </div>
  )
}

/* ══════════════════════════════════════════════
   EXPORT: mount both edges
   ══════════════════════════════════════════════ */

export default function AmbientEdges() {
  return (
    <>
      <GitCanvas />
      <ApiCanvas />
    </>
  )
}
