import React from "react";
import {connect} from 'react-redux';
import {Link,useLocation} from 'react-router-dom';
import './navbar.css';
import { logoutAction } from "../../redux/actions/actions";

const Navbar = ({user,logOut}) => {

  const location = useLocation();

    return(
        <nav className="navbar navbar-expand-lg navbar-light bg-light navbar">
          <div className="container-fluid">
                <button
                    className="navbar-toggler"
                    type="button"
                    data-mdb-toggle="collapse"
                    data-mdb-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                <i className="fas fa-bars"></i>
                </button>
        
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <Link className="navbar-brand mt-2 mt-lg-0" href="/">
                <i className='bx bxs-contact bx-md'></i>
              </Link>
              <h3 className="text-ContactManager mt-2">Contact Manager</h3>
            </div>

            {
              user.login? 
              <div className="d-flex align-items-center">
        
              <div className="dropdown">
                <a
                  className="dropdown-toggle d-flex align-items-center hidden-arrow"
                  href="#"
                  id="navbarDropdownMenuAvatar"
                  role="button"
                  data-mdb-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i className='user-icon bx bx-user bx-lg'></i>
                </a>
                <ul
                  className="dropdown-menu dropdown-menu-end"
                  aria-labelledby="navbarDropdownMenuAvatar"
                >
                  <li>
                    <a className="dropdown-item" href="#">Profile</a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">Settings</a>
                  </li>
                  <li>
                    <button className="dropdown-item" onClick={() => logOut() }>Logout</button>
                  </li>
                </ul>
              </div>
            </div>

              :
              location.pathname === '/' ? 
              <></> 
              :
                <Link to="/login" className="btn btn-primary" >Login</Link>
            }
          </div>
        </nav>
    );
}

const mapDispatchToProps = dispatch => {
  return {
    logOut : () => dispatch(logoutAction())
  }
}

const mapStateToProps = ({user}) =>
{
  console.log("navvar",user);
  return {user};
} 

export default connect(mapStateToProps,mapDispatchToProps)(Navbar);