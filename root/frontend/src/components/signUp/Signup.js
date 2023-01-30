import React, { useState } from "react";
import "./Signup.css";

function Signin({ changeLogged }) {
  // state for input field
  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
  });

  const signin = function (event) {
    event.preventDefault();
    if (
      input.name === "a"
      // input.password === "a" &&
      // input.password === "a"
    ) {
      changeLogged();
      console.log(input.name);
    }
  };

  const changeName = function (e) {
    setInput((prevInput) => {
      return { ...prevInput, name: e.target.value };
    });
  };

  return (
    <div className="signup-container">
      <form onSubmit={signin} className="form-validate">
        <p className="title">SIGN UP</p>
        <label for="name"></label>
        <input
          onChange={changeName}
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
}

export default Signin;
