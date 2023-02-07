import React, { useState, useRef } from "react";
import List from "./components/list/List";
import Alert from "./components/alert/Alert";
import Navbar from "./components/navbar/Navbar";
import Submit from "./components/submit/Submit";
import Login from "./components/logIn/Login";
import Signup from "./components/signUp/Signup";

function App() {
  // state for logged in
  const [logged, setLogged] = useState(false);

  // state for login or sign up
  const [route, setRoute] = useState("signup");

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

  //state for showing the alert
  const [showAlert, setShowAlert] = useState(null);

  // function to update the input state field when entering the que
  const changeInput = function (e) {
    setInput(e.target.value);
  };

  // function to update groceries state after every query
  const updateGroceires = function () {
    fetch(`http://localhost:3001/profile/${user.id}`)
      .then((res) => res.json())
      .then((data) => setGroceries(data));
  };

  // function to add groceries
  const addGrocerie = function () {
    // const id = Math.random();

    if (input !== "") {
      setShowAlert(false);
      fetch(`http://localhost:3001/profile/${user.id}/newGrocerie`, {
        method: "put",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: input,
        }),
      })
        .then((response) => {
          if (response) {
            updateGroceires();
          }
        })
        .catch((err) => console.log(err));
    } else {
      setShowAlert(true);
    }
    setInput("");
  };

  // function to remove all groceries
  const emptyList = function () {
    fetch(`http://localhost:3001/profile/${user.id}/clearList`, {
      method: "delete",
    })
      .then((response) => response.json())
      .then((data) => setGroceries(data));
  };

  // function to delete item
  const deleteGrocerie = function () {
    updateGroceires();
  };

  // function to edit grocerie list
  const editGrocerieList = function (data) {
    setGroceries(data);
  };

  // function to remove alert
  const removeALert = function () {
    setShowAlert(false);
  };

  // function to change logged status
  const changeLogged = function () {
    setLogged(true);
  };

  // function to switch between login and signup
  const switchRoute = function () {
    if (route === "signup") {
      setRoute("login");
    } else if (route === "login") {
      setRoute("signup");
    }
  };

  // function to sign out
  const signout = function () {
    setLogged(false);
    setRoute("login");
    console.log("aaa");
  };

  // function to update current user
  const updateUser = function (data) {
    setUser({
      id: data.id,
      name: data.name,
      email: data.email,
      groceries: data.groceries,
      joined: new Date(),
    });
  };

  return (
    <div>
      {route === "signup" && !logged && (
        <Signup
          changeLogged={changeLogged}
          switchRoute={switchRoute}
          updateUser={updateUser}
        />
      )}
      {route === "login" && !logged && (
        <Login switchRoute={switchRoute} changeLogged={changeLogged} />
      )}
      {logged && (
        <div>
          <Navbar signout={signout} />
          <div className="main-container">
            <div className="alert-container">
              {showAlert && <Alert removeALert={removeALert} />}
            </div>
            <Submit
              changeInput={changeInput}
              addGrocerie={addGrocerie}
              input={input}
            />
            <List
              user={user}
              groceries={groceries}
              deleteGrocerie={deleteGrocerie}
              emptyList={emptyList}
              editGrocerieList={editGrocerieList}
              input={input}
              changeInput={changeInput}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
