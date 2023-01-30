import React from "react";
import logo from "../../images/grocery.png";
import "./Navbar.css";

const Navbar = ({ signout }) => {
  return (
    <div className="navbar-container">
      <div className="navbar-left">
        <img src={logo} alt="logo" className="navbar-logo" />
        <p className="navbar-title">MY GROCERY LIST</p>
      </div>
      <div className="navbar-right">
        <a onClick={signout} className="navbar-signout">
          Signout
        </a>
      </div>
    </div>
  );
};

export default Navbar;
