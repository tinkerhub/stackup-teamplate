import React from 'react'
import './footer.css'

const Footer = () => {
  return (
    <div className='foot-cont'>
    <div className='footer-box'>
      <div className='col'>
        <div className='about'>
          <a href='#about'>About us</a>
        </div>
        <div className='contact'>
          <a href='#contact'>Contact us</a>
        </div>
      </div>
      <div className='col'>
        <div className='contact'>
          <a href='#FAQ'>FAQ</a>
        </div>
        <div className='contact'>
          <a href='#TermsofUse'>Terms of Use</a>
        </div>
      </div>
      <div className='col-fix'>
        <div className='mail-us'>
          <h4>Mail us:</h4>
          <p>matrizon@gmail.com</p>
        </div>
      </div>
      <div className='col-fix'>
        <div className='off-address'>
          <h4>Office Address:</h4>
          <p>Government Engineering College Palakkad, Mannampatta PO Palakkad, Kerala, India - 678633</p>
        </div>
      </div>
      
    </div>
    <div className='copy'>
      <p>Copyright &copy; matrizon.com</p>
    </div>
    </div>
  )
}

export default Footer