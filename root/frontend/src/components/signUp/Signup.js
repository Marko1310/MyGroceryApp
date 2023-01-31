import React, { useState } from "react";
import "./Signup.css";

function Signin({ changeLogged, switchRoute }) {
  // state for input field
  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
  });

  const signin = function (event) {
    event.preventDefault();
    fetch("http://localhost/3001/register", {
      method: "post",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        name: input.name,
        email: input.email,
        password: input.password,
      }),
    });

    changeLogged();
  };

  const changeName = function (e) {
    setInput((prevInput) => {
      return { ...prevInput, name: e.target.value };
    });
  };

  const changeEmail = function (e) {
    setInput((prevInput) => {
      return { ...prevInput, email: e.target.value };
    });
  };

  const changePassword = function (e) {
    setInput((prevInput) => {
      return { ...prevInput, password: e.target.value };
    });
  };

  return (
    <div className="signup-container">
      <form onSubmit={signin} className="form-validate">
        <p className="title">SIGN UP</p>
        <label htmlFor="name"></label>
        <input
          onChange={changeName}
          className="forms"
          type="text"
          id="name"
          name="name"
          placeholder="Name"
        ></input>

        <label htmlFor="email"></label>
        <input
          onChange={changeEmail}
          className="forms"
          type="text"
          id="email"
          name="email"
          placeholder="Email"
        ></input>

        <label htmlFor="password"></label>
        <input
          onChange={changePassword}
          className="forms"
          type="text"
          placeholder="Password"
        ></input>

        <button className="signup-button">sign up</button>
        <div className="login-footer">
          <p>Already a member? </p>
          <a onClick={switchRoute} className="login">
            Login
          </a>
        </div>
      </form>
    </div>
  );
}

export default Signin;
