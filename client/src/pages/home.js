import React, { useState, useEffect } from 'react';
import '../styles/home.css';
import Header from '../components/header';
import Footer from '../components/footer';

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
    // Function to automatically scroll through images
    const scrollImages = () => {
      setScrollIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    // Set an interval to call scrollImages every 3 seconds
    const interval = setInterval(scrollImages, 3000);

    return () => {
      // Clear the interval when the component unmounts to prevent memory leaks
      clearInterval(interval);
    };
  }, []);

  return (
  <div>
    <Header />
    <div className="categories">
        <div className="cat-cont">
        <div className="cat">
            <a className="cat-a1" href="/topoffers" aria-label="Top Offers">
                <div className="cat-inside">
                <div className="cat-img">
                <img src="/resources/top-offers.png" alt="Top Offers"></img><br></br>
                </div>
                <div className="cat-span">
                <span>Top Offers</span>
                </div>
                </div>
            </a>
        </div>
        <div className="cat">
            <a className="cat-a2" href="/moblaptops" aria-label="Mobiles & Laptops">
                <div className="cat-inside">
                <div className="cat-img">
                <img src="/resources/mob-laptops.png" alt="Mobiles & Laptops"></img><br></br>
                </div>
                <div className="cat-span">
                <span>Mobiles & Laptops</span>
                </div>
                </div>
            </a>
        </div>
        <div className="cat">
            <a className="cat-a4" href="/electronics" aria-label="Electronics">
                <div className="cat-inside">
                <div className="cat-img">
                <img src="/resources/electronics.png" alt="Electronics"></img><br></br>
                </div>
                <div className="cat-span">
                <span>Electronics</span>
                </div>
                </div>
            </a>
        </div>
        <div className="cat">
            <a className="cat-a5" href="/fashion" aria-label="Fashion">
                <div className="cat-inside">
                <div className="cat-img">
                <img src="/resources/fashion.png" alt="Fashion"></img><br></br>
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
                <img src="/resources/beauty.png" alt="Beauty"></img><br></br>
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
                <img src="/resources/home-appliances.png" alt="Home & Kitchen"></img><br></br>
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
                <img src="/resources/furniture.png" alt="Furniture"></img><br></br>
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
                <img src="/resources/grocery.png" alt="Grocery"></img><br></br>
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
        <div className="p-img" style={{transform: `translateX(-${scrollIndex * 100}%)`,}}>{images.map((src, index) => (<img key={index} src={src} alt="hi"></img>))}
        </div>
    </div>
    <Footer />
  </div>
 );
};

export default Home;
