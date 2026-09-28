import { useEffect, useRef } from 'react'
import { Renderer, Program, Mesh, Triangle } from 'ogl'

// Full-screen shader: a slow, warped flow field of contour lines that bends toward the pointer.
const vertex = /* glsl */ `
attribute vec2 position;
void main() { gl_Position = vec4(position, 0.0, 1.0); }
`

const fragment = /* glsl */ `
precision highp float;
uniform float uTime;
uniform vec2 uRes;
uniform vec2 uMouse;

float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1, 0)), u.x), mix(hash(i + vec2(0, 1)), hash(i + vec2(1, 1)), u.x), u.y);
}
float fbm(vec2 p) {
  float v = 0.0, a = 0.5;
  for (int i = 0; i < 5; i++) { v += a * noise(p); p = p * 2.02 + 17.0; a *= 0.5; }
  return v;
}

void main() {
  vec2 uv = gl_FragCoord.xy / uRes.xy;
  vec2 p = (gl_FragCoord.xy - 0.5 * uRes.xy) / uRes.y;
  vec2 m = (uMouse - 0.5 * uRes.xy) / uRes.y;

  float d = length(p - m);
  vec2 pull = (m - p) * 0.35 * exp(-d * 3.0);

  float t = uTime * 0.045;
  vec2 q = p * 1.6 + pull;
  vec2 w = vec2(fbm(q + t), fbm(q + vec2(5.2, 1.3) - t));
  float f = fbm(q + 2.2 * w + t * 0.6);

  // Contour lines
  float bands = 22.0;
  float c = abs(fract(f * bands) - 0.5) / fwidth(f * bands);
  float lines = 1.0 - clamp(c, 0.0, 1.0);

  vec3 base = vec3(0.027, 0.031, 0.039);
  vec3 signal = vec3(1.0, 0.42, 0.17);
  vec3 cool = vec3(0.49, 0.97, 0.83);

  float heat = smoothstep(0.35, 0.85, f) * (0.55 + 0.45 * exp(-d * 1.6));
  vec3 lineCol = mix(vec3(0.20, 0.21, 0.23), signal, heat);
  lineCol = mix(lineCol, cool, smoothstep(0.75, 1.0, w.x) * 0.35);

  float vignette = smoothstep(1.25, 0.2, length(uv - vec2(0.62, 0.6)));
  vec3 col = base + lineCol * lines * (0.35 + 0.65 * vignette);
  col += signal * 0.05 * exp(-d * 2.5);

  gl_FragColor = vec4(col, 1.0);
}
`

export default function Backdrop() {
  const ref = useRef(null)

  useEffect(() => {
    const canvas = ref.current
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let renderer
    try {
      renderer = new Renderer({ canvas, dpr: Math.min(window.devicePixelRatio, 1.5), antialias: false, webgl: 1 })
    } catch {
      return // No WebGL: the CSS gradient behind it still looks fine.
    }
    const gl = renderer.gl
    gl.getExtension('OES_standard_derivatives')

    const program = new Program(gl, {
      vertex,
      fragment: '#extension GL_OES_standard_derivatives : enable\n' + fragment,
      uniforms: { uTime: { value: 0 }, uRes: { value: [1, 1] }, uMouse: { value: [0, 0] } },
    })
    const mesh = new Mesh(gl, { geometry: new Triangle(gl), program })

    const target = [0, 0]
    const mouse = program.uniforms.uMouse.value
    const resize = () => {
      // Measure the parent: ogl writes inline px sizes onto the canvas itself.
      const { clientWidth: w, clientHeight: h } = canvas.parentElement
      renderer.setSize(w, h)
      program.uniforms.uRes.value = [gl.drawingBufferWidth, gl.drawingBufferHeight]
      target[0] = mouse[0] = gl.drawingBufferWidth * 0.72
      target[1] = mouse[1] = gl.drawingBufferHeight * 0.55
    }
    const onMove = e => {
      const r = canvas.getBoundingClientRect()
      const s = gl.drawingBufferWidth / r.width
      target[0] = (e.clientX - r.left) * s
      target[1] = (r.height - (e.clientY - r.top)) * s
    }
    resize()
    window.addEventListener('resize', resize)
    window.addEventListener('pointermove', onMove)

    let visible = true
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting })
    io.observe(canvas)

    let raf, start = performance.now()
    const frame = now => {
      raf = requestAnimationFrame(frame)
      if (!visible) return
      mouse[0] += (target[0] - mouse[0]) * 0.05
      mouse[1] += (target[1] - mouse[1]) * 0.05
      program.uniforms.uTime.value = (now - start) / 1000 + 40
      renderer.render({ scene: mesh })
    }
    if (reduce) { program.uniforms.uTime.value = 40; renderer.render({ scene: mesh }) }
    else raf = requestAnimationFrame(frame)

    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onMove)
      gl.getExtension('WEBGL_lose_context')?.loseContext()
    }
  }, [])

  return <canvas ref={ref} className="backdrop" aria-hidden="true" />
}
