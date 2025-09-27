import React from 'react'
import Hero from '../Hero'
import Project from '../Project'
import TechStack from '../Techstack'
import Getintouch from './Getintouch'
import Footer from './Footer'
import Experience from '../Experience'

const Home = () => {
  return (
    <div className='relative w-full'>
      <Hero/>
      <Experience/>
      <Project/>
      <TechStack/>
      <Getintouch/>
      <Footer/>
    </div>
  )
}

export default Home
