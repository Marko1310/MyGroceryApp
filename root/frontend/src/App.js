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

  // // state for edit field
  // const [inputEdit, setInputEdit] = useState("");

  // state for editing groceries
  const [editing, setEditing] = useState(false);

  // state for list of groceries
  // const [grocerieList, setGrocerieList] = useState(() => {
  //   return JSON.parse(localStorage.getItem("groceries")) || [];
  // });

  // state for current user
  const [user, setUser] = useState({
    id: "",
    name: "",
    email: "",
    groceries: [],
    joined: new Date(),
  });

  // state for grocerie list
  const [groceries, setGroceries] = useState(user.groceries);

  // const [grocerieList, setGrocerieList] = useState(user.groceries);

  // state for enable/disable buttons
  const [currentBtn, setCurrentBtn] = useState(false);

  //state for current grocerie list ID
  const [currentID, setCurrentID] = useState("");

  //state for showing the alert
  const [showAlert, setShowAlert] = useState(null);

  const editRef = useRef(null);

  // function to update the input state field when entering the que
  const changeInput = function (e) {
    setInput(e.target.value);
  };

  // function to update the edit input state
  const changeInputEdit = function (e) {
    setInput(e.target.value);
  };

  // function to add groceries
  const addGrocerie = function () {
    const id = Math.random();

    if (input !== "") {
      setShowAlert(false);
      fetch(`http://localhost:3001/profile/${user.id}/newGrocerie`, {
        method: "put",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          grocerie: { title: input, id: id, edit: false },
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          setGroceries(data);
        });
    } else {
      setShowAlert(true);
    }
    setInput("");
  };

  // function to remove all groceries
  // const emptyList = function () {
  //   setGrocerieList([]);
  // };

  // function to delete item
  const deleteGrocerie = function (data) {
    console.log(data);
    setGroceries(data);
  };

  // function to edit grocerie list
  const editGrocerieList = function (data) {
    setGroceries(data);
  };

  // change the state propertie of edit -> true/false by removing the element from the array and replacing with the new
  // const changeGrocerie = function (id) {
  //   editRef.current.focus();
  //   console.log(editRef.current);
  //   const grocerieCopy = [...grocerieList];
  //   for (let i = 0; i < grocerieCopy.length; i++) {
  //     if (id === grocerieCopy[i].id) {
  //       if (grocerieCopy[i].edit === true) {
  //         setEditing(false);
  //         grocerieCopy.splice(i, 1, {
  //           ...grocerieList[i],
  //           title: input === "" ? grocerieCopy[i].title : input,
  //           edit: false,
  //         });
  //       } else {
  //         setEditing(true);
  //         grocerieCopy.splice(i, 1, {
  //           ...grocerieList[i],
  //           edit: true,
  //         });
  //       }
  //     }
  //   }
  //   setGrocerieList(grocerieCopy);
  //   setInput("");
  //   setCurrentID(id);
  //   setCurrentBtn((prevState) => !prevState);
  // };

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
    console.log(data);
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
              // grocerieList={groceries}
              editing={editing}
            />
            <List
              user={user}
              groceries={groceries}
              // grocerieList={grocerieList}
              deleteGrocerie={deleteGrocerie}
              // emptyList={emptyList}
              editGrocerieList={editGrocerieList}
              input={input}
              changeInput={changeInput}
              changeInputEdit={changeInputEdit}
              currentBtn={currentBtn}
              currentID={currentID}
              editRef={editRef}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
