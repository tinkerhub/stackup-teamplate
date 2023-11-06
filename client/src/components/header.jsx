import React from 'react'
import './header.css'
import SearchIcon from '@mui/icons-material/Search';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';

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
        <div className="signin">
            <button>
                <PersonOutlineOutlinedIcon/>
                Sign in
            </button>
        </div>
        <div className="cart">
            <button>
                <ShoppingCartOutlinedIcon/>
                Cart
            </button>
        </div>
        <div className="dropd">
            <button>
                <MoreVertOutlinedIcon/>
            </button>
        </div>
    </div>
  )
}

export default Header