import React from "react";
import "./Login.css";

const Signin = ({ switchLoginSignup }) => {
  return (
    <div className="login-container">
      <form className="form-validate">
        <p className="title">LOGIN</p>
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

        <button className="signin-button">Login</button>
        <div className="login-footer">
          <p>Not a member? </p>
          <a onClick={switchLoginSignup} className="sign-up">
            {" "}
            Sign up now
          </a>
        </div>
      </form>
    </div>
  );
};

export default Signin;
