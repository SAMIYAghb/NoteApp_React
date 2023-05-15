import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  let token = localStorage.getItem('userToken');
  const navigate = useNavigate();
  function logOut (){
    localStorage.clear();
  
  }

  return (
    <>
      
      <nav className="navbar navbar-expand-lg navbar-light ">
        <div className="container">
          <h2 className="navbar-brand">Notes</h2>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              
              {
              token?<>
              <li className="nav-item">
                <span onClick={logOut} to="login" className="nav-link">LogOut</span>
              </li></>
              :<>
              <li className="nav-item">
                <Link to="login" className="nav-link"> Login</Link>
              </li>
              <li className="nav-item">
                <Link to="register" className="nav-link active" aria-current="page"> Register</Link>
              </li>
              </>
              
              }
              
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
