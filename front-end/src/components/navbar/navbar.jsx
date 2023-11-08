import React from "react";
import {connect} from 'react-redux';
import {Link,useLocation} from 'react-router-dom';
import './navbar.css';
import { logoutAction } from "../../redux/actions/actions";

const Navbar = ({user,logOut}) => {

  const location = useLocation();

  console.log("current path : ",location.pathname);

  console.log("inside ",user);
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
                <img
                  src="https://img.freepik.com/free-vector/illustration-graduation-hat_53876-5920.jpg?size=626&ext=jpg&ga=GA1.2.844804808.1682452210&semt=ais"
                  height="45"
                  alt="MDB Logo"
                  loading="lazy"
                />
              </Link>
              <h3 className="mt-2">Contact Manager</h3>
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
                  <img
                    src="https://img.freepik.com/free-vector/vector-cartoon-illustration-school-building-green-lawn-road-trees-educalion-l_134830-1588.jpg?w=1380&t=st=1694172352~exp=1694172952~hmac=d1edae63a90a97b8e212d0ead9e5dcd337c2c028e889c687af1585c64c3c0161"
                    className="profile-pic "
                    height="45"
                    alt="Black and White Portrait of a Man"
                    loading="lazy"
                  />
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