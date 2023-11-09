import React from 'react'
import './card.css'
import mobile from '../data/mobile';

const Card = () => {
  return (
    <>
      {mobile.map((element) => (
      <a className='card-cont' href='/mobiles'>
    <div className='card' key={element.name}>
        <div className='image'>
            <img src={element.image} alt='image1' />
        </div>
        <div className='details'>
            <p>{element.name}<br></br>
            <span style={{fontWeight: 500}}>incl of offers</span></p>
        </div>
    </div>
    </a>
    ))}
    </>
  )
}

export default Card