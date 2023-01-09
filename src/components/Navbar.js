import React from "react";
import logo from "../images/grocery.png";

const Navbar = () => {
  return (
    <div className="navbar-container">
      <img src={logo} className="navbar-logo" />
      <p className="navbar-title">MY GROCERY LIST</p>
      <img src={logo} className="navbar-logo" />
    </div>
  );
};

export default Navbar;
