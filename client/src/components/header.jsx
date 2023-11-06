import React from 'react'
import './header.css'
import SearchIcon from '@mui/icons-material/Search';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';

const Header = () => {
  return (
    <div className='header'>
        <div className="logo">
            <img src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/flipkart-095e08.svg" alt="flipkart logo" />
        </div>
        <div className="search">
            <input type='text' className='search-tab' placeholder='Search for products, brand and more'/>
            <SearchIcon/>
        </div>
        <div className="seller">
            <button>
                <div className='cntr'>
                    <StorefrontOutlinedIcon/>
                    Become a Seller
                </div>
            </button>
        </div>
        <div className='s-c-d'>
            <div className='dropdown'>
                <div className="signin">
                    <button className='signin'>
                        <div className='cntr'>
                            <PersonOutlineOutlinedIcon/>
                            Sign in
                        </div>
                    </button>
                    <div class="dropdown-content">
                        <a href="#signup">
                            <div className='cntr-li'>
                                <span>New Customer?</span>
                                <a href='#signup' className='signup'><span>Signup</span></a>
                            </div>
                        </a>
                        <a href="#">
                            <div className='cntr-li'>
                                <PersonOutlineOutlinedIcon />
                                My profile
                            </div>
                        </a>
                        <a href="#">
                            <div className='cntr-li'>
                                    <Inventory2OutlinedIcon />
                                    Orders
                            </div>
                        </a>
                        <a href="#">
                            <div className='cntr-li'>
                                    <FavoriteBorderOutlinedIcon />
                                    Wishlist
                            </div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="cart">
                <button>
                    <div className='cntr'>
                        <ShoppingCartOutlinedIcon/>
                        Cart
                    </div>
                </button>
            </div>
            <div className="dropd">
                <button>
                    <MoreVertOutlinedIcon/>
                </button>
            </div>
        </div>
    </div>
  )
}

export default Header