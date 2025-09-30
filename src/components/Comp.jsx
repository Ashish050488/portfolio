import React from 'react'
import Carousel from '../Effect/Carousel'

const Comp = () => {
  return (
    <div>

<div style={{  position: 'relative' }}>
  <Carousel
    baseWidth={300}
    baseHeight={250}
    autoplay={true}
    autoplayDelay={3000}
    pauseOnHover={true}
    loop={true}
    round={false}
  />
</div>
    </div>
  )
}

export default Comp
