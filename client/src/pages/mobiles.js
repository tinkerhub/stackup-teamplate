import React from 'react'
import '../styles/mobiles.css';
import Header from '../components/header';
import Footer from '../components/footer';
import ProductPage from '../components/productpage';

const Mobiles = () => {
  return (
    <div>
        <Header />
            <div className='categories'>
                <ProductPage />
            </div>
        <Footer />
    </div>
  )
}

export default Mobiles