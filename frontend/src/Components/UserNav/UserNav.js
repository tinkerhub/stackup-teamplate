import React, { useState } from 'react';
import './UserNav.css'


const UserNav = ({user}) => {
    const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`usernav ${isOpen ? 'open' : ''}`}>
          <div className="user-profile"   >
          <p>{user.name}</p>
        <img src={user.profilePicture} alt="Profile" onClick={toggleMenu}/>
       
      </div>
      
        <div className="user-dropdown">
          <ul>
            <li>Profile</li>
            <li>Settings</li>
            <li>Logout</li>
          </ul>
        </div>
     
      
    </div>
  )
}

export default UserNav
