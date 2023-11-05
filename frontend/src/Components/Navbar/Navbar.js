import React from 'react'
import './Navbar.css'
import HamburgerMenu from '../HamburgerMenu/HamburgerMenu';
import UserNav from '../UserNav/UserNav'



const Navbar = () => {
    const user = {
        name: 'John Doe',
        profilePicture: 'path-to-profile-picture.jpg',
      };
   

  return (
    <div className='navbar'>
        <HamburgerMenu/>
        <UserNav user={user} />
        
       
      
    </div>
  )
}

export default Navbar
