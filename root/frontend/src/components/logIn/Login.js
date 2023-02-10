import React, { useState } from "react";
import "./Login.css";

function Login({ changeLogged, updateUser, switchRoute }) {
  // state for input field
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

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

  const login = function (event) {
    event.preventDefault();
    fetch("http://localhost:3001/login", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: input.email,
        password: input.password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.id) {
          changeLogged();
          updateUser(data);
        }
      });
  };

  return (
    <div className="login-container">
      <form onSubmit={login} className="form-validate">
        <p className="title">LOGIN</p>
        <label htmlFor="email"></label>
        <input
          onChange={changeEmail}
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

        <button className="login-button">Login</button>
        <div className="login-footer">
          <p>Not a member? </p>
          <a onClick={switchRoute} className="sign-up">
            Sign up now
          </a>
        </div>
      </form>
    </div>
  );
}

export default Login;
