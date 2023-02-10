import React, { useState } from "react";
import "./Register.css";

function Register({ changeLogged, switchRoute, updateUser }) {
  // state for input field
  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
  });

  //state for alerts
  const [alert, setAlert] = useState({
    name: false,
    email: false,
    password: false,
  });

  const register = function (event) {
    event.preventDefault();
    fetch("http://localhost:3001/register", {
      method: "post",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        name: input.name,
        email: input.email,
        password: input.password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.id) {
          updateUser(data);
          changeLogged();
        } else if (data === "name can not be empty") {
          changeAlert("name");
        } else if (data === "not a proper email") {
          changeAlert("email");
        } else if (data === "password has to be at least 6 characters long") {
          changeAlert("password");
        }
      })
      .catch((err) => console.log(err));
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

  const changeAlert = function (type) {
    if (type === "name") {
      setAlert((prevAlert) => ({
        ...prevAlert,
        name: true,
        email: false,
        password: false,
      }));
    } else if (type === "email") {
      setAlert((prevAlert) => ({
        ...prevAlert,
        name: false,
        email: true,
        password: false,
      }));
    } else if (type === "password") {
      setAlert((prevAlert) => ({
        ...prevAlert,
        name: false,
        email: false,
        password: true,
      }));
    }
  };

  return (
    <div className="register-container">
      <form onSubmit={register} className="form-validate">
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
        {alert.name && (
          <p className="register-alert">Name field can not be empty</p>
        )}

        <label htmlFor="email"></label>
        <input
          onChange={changeEmail}
          className="forms"
          type="text"
          id="email"
          name="email"
          placeholder="Email"
        ></input>
        {alert.email && <p className="register-alert">Not a proper email</p>}

        <label htmlFor="password"></label>
        <input
          onChange={changePassword}
          className="forms"
          type="text"
          placeholder="Password"
        ></input>
        {alert.password && (
          <p className="register-alert">
            Password has to be at least 6 characters long
          </p>
        )}

        <button className="register-button">sign up</button>
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

export default Register;
