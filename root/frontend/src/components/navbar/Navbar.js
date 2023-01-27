import React from "react";
import logo from "../../images/grocery.png";
import "./Navbar.css";

const Navbar = () => {
  return (
    <div className="navbar-container">
      <img src={logo} className="navbar-logo" />
      <p className="navbar-title">MY GROCERY LIST</p>
    </div>
  );
};

export default Navbar;
