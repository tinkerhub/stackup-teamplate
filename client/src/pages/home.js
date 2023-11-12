import React, { useState, useEffect } from 'react';
import '../styles/home.css';
import Header from '../components/header';
import Footer from '../components/footer';
import Card from '../components/card'; 

const Home = () => {
    const [scrollIndex, setScrollIndex] = useState(0);

  const images = [
    "/resources/iphone-sale.png",
    "/resources/laptop-sale.png",
    "/resources/fashion-sale.png",
    "/resources/shoes-sale.png",
    "/resources/tv-sale.png",
    "/resources/beauty-sale.png"
  ];

  useEffect(() => {
    const scrollImages = () => {
      setScrollIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const interval = setInterval(scrollImages, 5000);

    return () => {
      // Clear the interval when the component unmounts to prevent memory leaks
      clearInterval(interval);
    };
  }, []);
//   const handleScroll = (direction) => {
//     const newIndex = scrollIndex + direction;
//     if (newIndex >= 0 && newIndex < images.length) {
//       setScrollIndex(newIndex);
//     }
//   };
  const handleScroll = () => {
    setScrollIndex((prevIndex) => (prevIndex + 1) % images.length);
  };
  return (
  <div>
    <Header />
    <div className="categories">
        <div className="cat-cont">
        <div className="cat">
            <a className="cat-a1" href="/topoffers" aria-label="Top Offers">
                <div className="cat-inside">
                <div className="cat-img">
                <img src="/resources/top-offers.png" alt="Top Offers"></img>
                </div>
                <div className="cat-span">
                <span>Top Offers</span>
                </div>
                </div>
            </a>
        </div>
        <div className="cat">
            <a className="cat-a4" href="/electronics" aria-label="Electronics">
                <div className="cat-inside">
                <div className="cat-img">
                <img src="/resources/electronics.png" alt="Electronics"></img>
                </div>
                <div className="cat-span">
                <span>Electronics</span>
                </div>
                </div>
            </a>
        </div>
        <div className="cat">
            <a className="cat-a2" href="/moblaptops" aria-label="Mobiles & Laptops">
                <div className="cat-inside">
                <div className="cat-img">
                <img src="/resources/mob-laptops.png" alt="Mobiles & Laptops"></img>
                </div>
                <div className="cat-span">
                <span>Mobiles & Laptops</span>
                </div>
                </div>
            </a>
        </div>
        <div className="cat">
            <a className="cat-a5" href="/fashion" aria-label="Fashion">
                <div className="cat-inside">
                <div className="cat-img">
                <img src="/resources/fashion.png" alt="Fashion"></img>
                </div>
                <div className="cat-span">
                <span>Fashion</span>
                </div>
                </div>
            </a>
        </div>
        <div className="cat">
            <a className="cat-a6" href="/beauty" aria-label="Beauty">
                <div className="cat-inside">
                <div className="cat-img">
                <img src="/resources/beauty.png" alt="Beauty"></img>
                </div>
                <div className="cat-span">
                <span>Beauty</span>
                </div>
                </div>
            </a>
        </div>
        <div className="cat">
            <a className="cat-a3" href="/homeappliances" aria-label="Home & Kitchen">
                <div className="cat-inside">
                <div className="cat-img">
                <img src="/resources/home-appliances.png" alt="Home & Kitchen"></img>
                </div>
                <div className="cat-span">
                <span>Home & Kitchen</span>
                </div>
                </div>
            </a>
        </div>
        <div className="cat">
            <a className="cat-a7" href="/furniture" aria-label="Furniture">
                <div className="cat-inside">
                <div className="cat-img">
                <img src="/resources/furniture.png" alt="Furniture"></img>
                </div>
                <div className="cat-span">
                <span>Furniture</span>
                </div>
                </div>
            </a>
        </div>
        <div className="cat">
            <a className="cat-a8" href="/grocery" aria-label="Grocery">
                <div className="cat-inside">
                <div className="cat-img">
                <img src="/resources/grocery.png" alt="Grocery"></img>
                </div>
                <div className="cat-span">
                <span>Grocery</span>
                </div>
                </div>
            </a>
        </div>
        </div>
    </div>
    <div className="posters">
        <div className='home-scroll'>
    <div className="scroll-arrow-left" onClick={() => handleScroll(-1)}>
          &lt; {/* Left Arrow */}
        </div>
        <div className="scroll-arrow-right" onClick={() => handleScroll(1)}>
          &gt; {/* Right Arrow */}
        </div>
        </div>
        <div className="p-img" style={{transform: `translateX(-${scrollIndex * 100}%)`,}}>{images.map((src, index) => (<img key={index} src={src} alt="Top Offers"></img>))}
        </div>
    </div>
    <div className='best-mobile'>
        <div className='best-mobile-text'>
            <h2>Best Mobiles</h2>
        </div>
        <div className='mobile-card-list'>
            <Card className='mobile-card'/>
        </div>
    </div>
    <div className='top-deals'>
        <div className='top-deals-text'>
            <h2>Top Deals</h2>
        </div>
        <div className='top-deals-card-list'>
            <Card className='top-deals-card'/>
        </div>
    </div>
    <div className='top-electronics'>
        <div className='top-electronics-text'>
            <h2>Top Deals on Electronics</h2>
        </div>
        <div className='top-electronics-card-list'>
            <Card className='top-electronics-card'/>
        </div>
    </div>
    <div className='fashion-best-seller'>
        <div className='fashion-best-seller-text'>
            <h2>Fashion best Seller</h2>
        </div>
        <div className='fashion-best-seller-card-list'>
            <Card className='fashion-best-seller-card'/>
        </div>
    </div>
    <div className='beauty-foods'>
        <div className='beauty-foods-text'>
            <h2>Beauty Foods and more</h2>
        </div>
        <div className='beauty-foods-card-list'>
            <Card className='beauty-foods-card'/>
        </div>
    </div>
    <div className='home-furnishing'>
        <div className='home-furnishing-text'>
            <h2>Home and Furnishing</h2>
        </div>
        <div className='home-furnishing-card-list'>
            <Card className='home-furnishing-card'/>
        </div>
    </div>
    <Footer />
  </div>
 );
};

export default Home;
