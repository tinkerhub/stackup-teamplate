import React from 'react'
import './card.css'
import mobile from '../data/mobile';


const Card = () => {
  return (
    <>
      {mobile.map((element) => (
      
      <div className='card' key={element.name}>
        <div className='image'>
            <img src={element.image} alt='image1' />
        </div>
        <div className='details'>
            <p>{element.name}<br></br>
            <b>incl of offers</b></p>
        </div>
    </div>
    ))}
    </>
  )
}

export default Card