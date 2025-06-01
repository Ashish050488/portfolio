import React, { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import {NavButton} from '../Button/Button.jsx'
import NavMenu from '../Button/NavMenu.jsx'



const Nav = () => {

  const [isOpen,setIsOpen]= useState(false);

  return (
    <div>
    <div className='w-full h-14 mb-4  flex justify-center items-center'>
      <NavButton isOpen={isOpen} setIsOpen={setIsOpen}/>
    </div>

<AnimatePresence mode="wait">
  {isOpen && <NavMenu isOpen={isOpen} />}
</AnimatePresence>
    </div>
  )
}

export default Nav
