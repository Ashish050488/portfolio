import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

function randomPos() {
  return {
    x: (Math.random() - 0.5) * window.innerWidth * 1.4,
    y: (Math.random() - 0.5) * window.innerHeight * 1.4,
    rotate: (Math.random() - 0.5) * 180,
  }
}

export default function IntroAnimation({ onComplete }) {
  const [phase, setPhase] = useState('waiting')
  const [visible, setVisible] = useState(true)

  const firstName = 'ASHISH'
  const lastName = 'RANJAN'

  const letterPositions = useMemo(() => {
    const all = [...firstName, ' ', ...lastName]
    return all.map(() => randomPos())
  }, [])

  useEffect(() => {
    const hasVisited = sessionStorage.getItem('intro-played')
    if (hasVisited) {
      setVisible(false)
      onComplete()
      return
    }

    const t1 = setTimeout(() => setPhase('noise'), 300)
    const t2 = setTimeout(() => setPhase('assemble'), 900)
    const t3 = setTimeout(() => setPhase('hold'), 2100)
    const t4 = setTimeout(() => {
      setPhase('fadeout')
      sessionStorage.setItem('intro-played', 'true')
    }, 2500)
    const t5 = setTimeout(() => {
      setVisible(false)
      onComplete()
    }, 3000)

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
      clearTimeout(t4)
      clearTimeout(t5)
    }
  }, [onComplete])

  if (!visible) return null

  const allLetters = [...firstName, '\u00A0', ...lastName]

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100000] flex items-center justify-center"
          style={{ backgroundColor: '#080808' }}
          initial={{ opacity: 1 }}
          animate={{ opacity: phase === 'fadeout' ? 0 : 1 }}
          transition={{ duration: 0.5 }}
        >
          {phase === 'noise' && (
            <motion.div
              className="absolute inset-0"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                backgroundSize: '128px 128px',
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.05, 0.12, 0.05, 0.1, 0.04] }}
              transition={{ duration: 0.6, times: [0, 0.25, 0.5, 0.75, 1] }}
            />
          )}

          {(phase === 'noise' || phase === 'assemble' || phase === 'hold') && (
            <motion.div
              className="absolute inset-0"
              style={{
                backgroundImage: 'radial-gradient(#1C1C1C 1px, transparent 1px)',
                backgroundSize: '24px 24px',
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: phase === 'noise' ? 0 : 1 }}
              transition={{ duration: 0.8 }}
            />
          )}

          <div className="relative flex flex-wrap justify-center" style={{ maxWidth: '90vw' }}>
            {allLetters.map((letter, i) => {
              const initial = letterPositions[i]
              const isAssembled = phase === 'assemble' || phase === 'hold' || phase === 'fadeout'

              return (
                <motion.span
                  key={i}
                  className="font-serif inline-block"
                  style={{
                    fontSize: 'clamp(4rem, 10vw, 9rem)',
                    lineHeight: 1,
                    color: '#F0F0F0',
                    letterSpacing: '-0.03em',
                  }}
                  initial={{
                    x: initial.x,
                    y: initial.y,
                    rotate: initial.rotate,
                    opacity: 0,
                  }}
                  animate={{
                    x: isAssembled ? 0 : initial.x,
                    y: isAssembled ? 0 : initial.y,
                    rotate: isAssembled ? 0 : initial.rotate,
                    opacity: phase === 'waiting' ? 0 : 1,
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 80,
                    damping: 15,
                    delay: isAssembled ? i * 0.04 : 0,
                  }}
                >
                  {letter}
                </motion.span>
              )
            })}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
