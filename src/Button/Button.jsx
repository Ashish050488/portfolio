import React, { useState, useRef, useLayoutEffect } from 'react'
import { IoCloseOutline } from 'react-icons/io5'
import { motion, AnimatePresence } from 'framer-motion'

export const NavButton = ({isOpen,setIsOpen}) => {
  const openRef = useRef(null)
  const closeRef = useRef(null)

  const [openWidth, setOpenWidth] = useState(0)
  const [closeWidth, setCloseWidth] = useState(0)

  useLayoutEffect(() => {
    if (openRef.current) setOpenWidth(openRef.current.offsetWidth)
    if (closeRef.current) setCloseWidth(closeRef.current.offsetWidth)
  }, [])

  return (
    <motion.button
      onClick={() => setIsOpen(prev => !prev)}
      className="bg-[#176161] rounded-full text-white overflow-hidden"
      style={{ width: isOpen ? closeWidth : openWidth }}
      animate={{ width: isOpen ? closeWidth : openWidth }}
      transition={{ width: { duration: 0.3, type: 'spring', stiffness: 250, damping: 18 } }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Hidden refs for width measurement */}
      <div
        ref={openRef}
        className="flex items-center px-5 absolute left-[-9999px] top-[-9999px] pointer-events-none select-none"
        aria-hidden="true"
      >
        <div className="text-xl rotate-90">🌙</div>
        <p>Explore the phases</p>
      </div>
      <div
        ref={closeRef}
        className="flex items-center px-5 absolute left-[-9999px] top-[-9999px] pointer-events-none select-none"
        aria-hidden="true"
      >
        <IoCloseOutline className="text-2xl" />
      </div>

      <AnimatePresence mode="wait" initial={false}>
        {isOpen ? (
          <motion.div
            key="close"
            className="flex items-center px-5 py-2 whitespace-nowrap"
            initial={{ opacity: 0, rotate: -180, scale: 0.8 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            transition={{
              rotate: { duration: 0.4, ease: 'easeInOut' },
              opacity: { duration: 0.2 },
              scale: { duration: 0.3 }
            }}
            style={{ minHeight: 40 }}
          >
            <IoCloseOutline className="text-2xl" />
          </motion.div>
        ) : (
          <motion.div
            key="open"
            className="flex items-center px-5 py-2 whitespace-nowrap"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.25 }}
            style={{ minHeight: 40 }}
          >
            <div className="text-xl rotate-90 mr-1">🌙</div>
            <p>Explore the phases</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  )
}
