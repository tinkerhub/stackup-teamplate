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
        <div className='header-sub'>
        <div className="logo">
            <img src="/resources/matrizen-logo.png" alt="flipkart logo" />
        </div>
        <div className="search">
            <SearchIcon/>
            <input type='text' className='search-tab' placeholder='Search for products, brand and more'/>    
        </div>
            <a href="/seller">
            <button className='seller-button'>
                <div className='cntr'>
                    <StorefrontOutlinedIcon/>
                    <span>Become a Seller</span>
                </div>
            </button>
            </a>
            <div className='dropdown'>
            <a href="/signin">
                    <button className='tosignin-button'>
                        <div className='cntr'>
                            <PersonOutlineOutlinedIcon/>
                            <span>Sign In</span>
                        </div>
                    </button>
                    </a>
                    <div class="dropdown-content">
                        <a href="/signup">
                            <div className='cntr-li' id="cntr-li1">
                                <span>New Customer?</span>
                                <a href='/signup' id='tosignup'><span>Signup</span></a>
                            </div>
                        </a>
                        <div className='dropdown2'>
                        <a href="/myprofile">
                            <div className='cntr-li'>
                                <PersonOutlineOutlinedIcon />
                                <span>My profile</span>
                            </div>
                        </a>
                        <a href="/orders">
                            <div className='cntr-li'>
                                    <Inventory2OutlinedIcon />
                                    <span>Orders</span>
                            </div>
                        </a>
                        <a href="/wishlists">
                            <div className='cntr-li'>
                                    <FavoriteBorderOutlinedIcon />
                                    <span>Wishlists</span>
                            </div>
                        </a>
                        </div>
                    </div>
            </div>
            <a href="/cart">
                <button className='cart-button'>
                    <div className='cntr'>
                        <ShoppingCartOutlinedIcon/>
                        <span>Cart</span>
                    </div>
                </button>
                </a>
                <button className='dropd-button'>
                    <MoreVertOutlinedIcon/>
                </button>
        </div>
    </div>
  )
}

export default Header