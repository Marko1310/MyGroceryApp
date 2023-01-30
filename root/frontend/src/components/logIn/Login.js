import React, { useState } from "react";
import "./Login.css";

function Login({ changeLogged, switchLoginSignup }) {
  // state for input field
  const [input, setInput] = useState({
    name: "",
    password: "",
  });

  const changeName = function (e) {
    setInput((prevInput) => {
      return { ...prevInput, name: e.target.value };
    });
  };

  const changePassword = function (e) {
    setInput((prevInput) => {
      return { ...prevInput, password: e.target.value };
    });
  };

  const login = function (event) {
    event.preventDefault();
    if (input.name === "a" && input.password === "a") {
      changeLogged();
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={login} className="form-validate">
        <p className="title">LOGIN</p>
        <label htmlFor="email"></label>
        <input
          onChange={changeName}
          className="forms"
          type="text"
          id="fname"
          name="fname"
          placeholder="Email"
        ></input>

        <label htmlFor="password"></label>
        <input
          onChange={changePassword}
          className="forms"
          type="text"
          placeholder="Password"
        ></input>

        <button className="signin-button">Login</button>
        <div className="login-footer">
          <p>Not a member? </p>
          <a onClick={switchLoginSignup} className="sign-up">
            Sign up now
          </a>
        </div>
      </form>
    </div>
  );
}

export default Login;
