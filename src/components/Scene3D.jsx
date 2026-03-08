import { useRef, useEffect, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'

function WireSphere() {
  const meshRef = useRef()
  const mouse = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const onMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2
      mouse.current.y = (e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  useFrame((_, delta) => {
    if (!meshRef.current) return
    meshRef.current.rotation.y += delta * 0.15
    meshRef.current.rotation.x += (mouse.current.y * 0.3 - meshRef.current.rotation.x) * 0.02
    meshRef.current.rotation.z += (mouse.current.x * 0.15 - meshRef.current.rotation.z) * 0.02
  })

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[2.2, 1]} />
      <meshBasicMaterial wireframe color="#2E2E2E" transparent opacity={0.6} />
    </mesh>
  )
}

export default function Scene3D() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5.5], fov: 50 }}
      style={{ width: '100%', height: '100%' }}
      gl={{ alpha: true, antialias: true }}
    >
      <Suspense fallback={null}>
        <WireSphere />
      </Suspense>
    </Canvas>
  )
}
