import React, { useState, useEffect } from "react";
import List from "./components/list/List";
import Navbar from "./components/navbar/Navbar";
import Submit from "./components/submit/Submit";
import Login from "./components/logIn/Login";
import Register from "./components/register/Register";

function App() {
  // state for logged in
  const [logged, setLogged] = useState(false);

  // state for login or register
  const [route, setRoute] = useState("login");

  // state for input field
  const [input, setInput] = useState("");

  // state for current user
  const [user, setUser] = useState({
    id: "",
    name: "",
    email: "",
    joined: new Date(),
  });

  // state for grocerie list
  const [groceries, setGroceries] = useState([]);

  // function to update groceries state after every query to the database
  const updateGroceires = function () {
    fetch(`https://mygrocerieapp-api.onrender.com/profile/${user.id}`)
      .then((res) => res.json())
      .then((grocerieList) => {
        setGroceries(grocerieList);
      });
  };

  // function to change logged status
  const changeLogged = function () {
    setLogged(true);
  };

  // function to switch between login and register
  const switchRoute = function () {
    if (route === "register") {
      setRoute("login");
    } else if (route === "login") {
      setRoute("register");
    }
  };

  // function to sign out
  const signout = function () {
    setLogged(false);
    setRoute("login");
  };

  // function to update current user
  const updateUser = function (data) {
    setUser({
      id: data.id,
      name: data.name,
      email: data.email,
    });
  };

  // update user information after updateUser function sets user
  useEffect(() => {
    if (user.id !== "") {
      updateGroceires();
    }
  }, [user]);

  return (
    <div>
      {route === "register" && !logged && (
        <Register
          changeLogged={changeLogged}
          switchRoute={switchRoute}
          updateUser={updateUser}
        />
      )}
      {route === "login" && !logged && (
        <Login
          switchRoute={switchRoute}
          changeLogged={changeLogged}
          updateUser={updateUser}
        />
      )}
      {logged && (
        <div>
          <Navbar signout={signout} user={user} />
          <div className="main-container">
            <Submit updateGroceires={updateGroceires} user={user} />
            <List
              user={user}
              groceries={groceries}
              input={input}
              updateGroceires={updateGroceires}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
