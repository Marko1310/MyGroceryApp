import React, { useState, useEffect } from "react";
import List from "./components/list/List";
import Alert from "./components/alert/Alert";
import Navbar from "./components/navbar/Navbar";
import Submit from "./components/submit/Submit";

function App() {
  // state for input field
  const [input, setInput] = useState("");

  // state for edit field
  const [inputEdit, setInputEdit] = useState("");

  // state for list of groceries
  const [grocerieList, setGrocerieList] = useState(() => {
    return JSON.parse(localStorage.getItem("groceries")) || [];
  });

  useEffect(() => {
    localStorage.setItem("groceries", JSON.stringify(grocerieList));
  }, [grocerieList]);

  // state for enable/disable buttons
  const [currentBtn, setCurrentBtn] = useState(false);

  //state for current ID
  const [currentID, setCurrentID] = useState("");

  //state for showing the alert
  const [showAlert, setShowAlert] = useState(null);

  // function to update the input state field when entering the que
  const changeInput = function (e) {
    setInput(e.target.value);
  };

  // function to update the edit input state
  const changeInputEdit = function (e) {
    setInputEdit(e.target.value);
  };

  // function to add groceries
  const addGrocerie = function () {
    const id = Math.random();

    if (input !== "") {
      setShowAlert(false);
      setGrocerieList((prevGrocerieList) => {
        return [...prevGrocerieList, { title: input, id: id, edit: false }];
      });
    } else {
      setShowAlert(true);
    }
    setInput("");
  };

  // function to remove all groceries
  const emptyList = function () {
    setGrocerieList([]);
  };

  // function to delete item
  const deleteItem = function (id) {
    // filter items in array that id is not equal to selected id
    setGrocerieList(grocerieList.filter((el) => el.id !== id));
  };

  // change the state propertie of edit -> true/false by removing the element from the array and replacing with the new
  const changeEdit = function (id) {
    const grocerieCopy = [...grocerieList];
    for (let i = 0; i < grocerieCopy.length; i++) {
      if (id === grocerieCopy[i].id) {
        if (grocerieCopy[i].edit === true) {
          grocerieCopy.splice(i, 1, {
            ...grocerieList[i],
            title: inputEdit,
            edit: false,
          });
        } else
          grocerieCopy.splice(i, 1, {
            ...grocerieList[i],
            edit: true,
          });
      }
    }
    setGrocerieList(grocerieCopy);
    setInputEdit("");
    setCurrentID(id);
    setCurrentBtn((prevState) => !prevState);
  };

  // function to remove alert
  const removeALert = function () {
    setShowAlert(false);
  };

  return (
    <div>
      <Navbar />
      <div className="main-container">
        <div className="alert-container">
          {showAlert && <Alert removeALert={removeALert} />}
        </div>
        <Submit
          changeInput={changeInput}
          addGrocerie={addGrocerie}
          input={input}
          grocerieList={grocerieList}
        />
        <List
          grocerieList={grocerieList}
          deleteItem={deleteItem}
          emptyList={emptyList}
          changeEdit={changeEdit}
          changeInput={changeInput}
          inputEdit={inputEdit}
          changeInputEdit={changeInputEdit}
          currentBtn={currentBtn}
          currentID={currentID}
        />
      </div>
    </div>
  );
}

export default App;
