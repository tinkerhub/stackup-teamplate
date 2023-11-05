import React from 'react';
import '../styles/home.css';

const Home = () => (
  <div>
    <div className="categories">
        <div>
            <a className="cat-a1" href="/topoffers" aria-label="Top Offers">
                <div className="cat-inside">
                <img className="cat-img1" src="/resources/top-offers.png" alt="Top Offers"></img><br></br>
                <span className="cat-span">Top Offers</span>
                </div>
            </a>
        </div>
        <div>
            <a className="cat-a2" href="/moblaptops" aria-label="Mobiles & Laptops">
                <div className="cat-inside">
                <img className="cat-img2" src="/resources/mob-laptops.png" alt="Mobiles & Laptops"></img><br></br>
                <span className="cat-span">Mobiles & Laptops</span>
                </div>
            </a>
        </div>
        <div>
            <a className="cat-a4" href="/electronics" aria-label="Electronics">
                <div className="cat-inside">
                <img className="cat-img4" src="/resources/electronics.png" alt="Electronics"></img><br></br>
                <span className="cat-span">Electronics</span>
                </div>
            </a>
        </div>
        <div>
            <a className="cat-a5" href="/fashion" aria-label="Fashion">
                <div className="cat-inside">
                <img className="cat-img5" src="/resources/fashion.png" alt="Fashion"></img><br></br>
                <span className="cat-span">Fashion</span>
                </div>
            </a>
        </div>
        <div>
            <a className="cat-a6" href="/beauty" aria-label="Beauty">
                <div className="cat-inside">
                <img className="cat-img6" src="/resources/beauty.png" alt="Beauty"></img><br></br>
                <span className="cat-span">Beauty</span>
                </div>
            </a>
        </div>
        <div>
            <a className="cat-a3" href="/homeappliances" aria-label="Home & Kitchen">
                <div className="cat-inside">
                <img className="cat-img3" src="/resources/home-appliances.png" alt="Home & Kitchen"></img><br></br>
                <span className="cat-span">Home & Kitchen</span>
                </div>
            </a>
        </div>
        <div>
            <a className="cat-a7" href="/furniture" aria-label="Furniture">
                <div className="cat-inside">
                <img className="cat-img7" src="/resources/furniture.png" alt="Furniture"></img><br></br>
                <span className="cat-span">Furniture</span>
                </div>
            </a>
        </div>
        <div>
            <a className="cat-a8" href="/grocery" aria-label="Grocery">
                <div className="cat-inside">
                <img className="cat-img8" src="/resources/grocery.png" alt="Grocery"></img><br></br>
                <span className="cat-span">Grocery</span>
                </div>
            </a>
        </div>
    </div>
  </div>
);

export default Home;
