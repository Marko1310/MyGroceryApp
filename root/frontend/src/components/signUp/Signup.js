import React from "react";
import "./Signup.css";

const Signin = () => {
  return (
    <div className="signup-container">
      <form className="form-validate">
        <p className="title">SIGN UP</p>
        <label for="name"></label>
        <input
          className="forms"
          type="text"
          id="name"
          name="name"
          placeholder="Name"
        ></input>

        <label for="email"></label>
        <input
          className="forms"
          type="text"
          id="email"
          name="email"
          placeholder="Email"
        ></input>

        <label for="password"></label>
        <input className="forms" type="text" placeholder="Password"></input>

        <button className="signup-button">sign up</button>
        <div className="login-footer">
          <p>Already a member? </p>
          <a className="login">Login</a>
        </div>
      </form>
    </div>
  );
};

export default Signin;
