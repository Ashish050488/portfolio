import React from 'react'
import { motion } from 'framer-motion'
import { IoCloseOutline } from 'react-icons/io5'
import play from '../assets/play.svg'
import Newmoon from '../assets/Newmoon.svg'
import fullMooni from '../assets/fullMooni.svg'
import firstquarter from '../assets/firstquarter.svg'
import WaxingCrescent from '../assets/WaxingCrescent.svg'
import WaxingGibbous from '../assets/WaxingGibbous.svg'

const MenuItems = [
  { page: 'Home', subtitle: 'New Moon', image: Newmoon },
  { page: 'Projects', subtitle: 'First Quarter', image: firstquarter },
  { page: 'Tech Stack', subtitle: 'Waxing Gibbous', image: WaxingGibbous },
  { page: 'About', subtitle: 'Waxing Crescent', image: WaxingCrescent },
  { page: 'Contact', subtitle: 'Full Moon', image: fullMooni }
]

const containerVariants = {
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      staggerDirection: -1.5
    }
  },
  hidden: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      staggerDirection: -1.5
    }
  }
}

const itemVariants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
    y: 20,
    transition: { type: 'spring', stiffness: 300, damping: 30 }
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: -20,
    transition: { type: 'spring', stiffness: 300, damping: 30 }
  }
}

const NavMenu = ({ isOpen, setIsOpen }) => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate={isOpen ? 'visible' : 'hidden'}
      exit="hidden"
      className="fixed inset-0 z-40 flex flex-col items-center justify-center backdrop-blur-lg bg-black/40"
    >
      <div className="absolute top-6 right-6 z-50">
        {/* <button
          onClick={() => setIsOpen(false)}
          className="bg-[#176161] text-white rounded-full p-2"
        >
          <IoCloseOutline className="text-2xl" />
        </button> */}
      </div>

      <div className="w-full flex-col gap-4 px-4">
        {MenuItems.map(({ page, subtitle, image }) => (
          <motion.div variants={itemVariants} key={page}>
            <div className="mx-4 mb-4 rounded-2xl flex justify-between px-4 items-center bg-[#EBf0f0]">
              <div className="p-4">
                <div className="flex items-center gap-4">
                  <img src={image} alt={page} />
                  <div className="flex flex-col leading-tight">
                    <span>{page}</span>
                    <span className="text-sm text-[#667d7d]">{subtitle}</span>
                  </div>
                </div>
              </div>
              <div className="w-20 p-4">
                <img src={play} alt="play-icon" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

export default NavMenu
