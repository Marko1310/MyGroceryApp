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

  //state for alerts
  const [alert, setAlert] = useState({
    email: false,
    password: false,
  });

  const changeAlert = function (type) {
    if (type === "email") {
      setAlert((prevAlert) => ({
        ...prevAlert,
        email: true,
        password: false,
      }));
    } else if (type === "password") {
      setAlert((prevAlert) => ({
        ...prevAlert,
        email: false,
        password: true,
      }));
    }
  };

  const login = function (event) {
    event.preventDefault();
    fetch("https://mygrocerieapp-api.onrender.com/login", {
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
        if (data === "wrong credentials") {
          changeAlert("email");
        } else if (data === "wrong password") {
          changeAlert("password");
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
        {alert.email && <p className="register-alert">Wrong credentials</p>}

        <label htmlFor="password"></label>
        <input
          onChange={changePassword}
          className="forms"
          type="text"
          placeholder="Password"
        ></input>
        {alert.password && <p className="register-alert">Wrong password</p>}

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
