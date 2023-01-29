import React from "react";
import "./Signup.css";

const Signin = () => {
  return (
    <div className="signup-container">
      <form className="form-validate">
        <p className="title">SIGNUP</p>
        <label for="email"></label>
        <input
          className="forms"
          type="text"
          id="fname"
          name="fname"
          placeholder="Email"
        ></input>

        <label for="password"></label>
        <input className="forms" type="text" placeholder="Password"></input>

        <button className="signup-button">Login</button>
        <div className="login-footer">
          <p>Already a member? </p>
          <a className="login">Login</a>
        </div>
      </form>
    </div>
  );
};

export default Signin;
