import React, { useState, useEffect } from "react";
import List from "./components/List";
import Alert from "./components/Alert";
import Navbar from "./components/Navbar";
import Submit from "./components/Submit";

function App() {
  // state for input field
  const [input, setInput] = useState("");

  // state for list of groceries
  const [grocerieList, setGrocerieList] = useState([]);

  // state for editing button
  const [isEditing, setIsEditing] = useState(false);

  // function to update the input state field when entering the que
  const changeInput = function (e) {
    setInput(e.target.value);
  };

  // function to add groceries
  const addGrocerie = function () {
    const id = Math.random();

    setGrocerieList((prevGrocerieList) => {
      return [...prevGrocerieList, { title: input, id: id, edit: false }];
    });
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

  // change the state propertie of edit -> true by removing the element from the array and replacing with the new element
  const changeEdit = function (id) {
    for (let i = 0; i < grocerieList.length; i++) {
      if (id === grocerieList[i].id) {
        const grocerieCopy = [...grocerieList];
        grocerieCopy.splice(i, 1, { ...grocerieList[i], edit: true });
        setGrocerieList(grocerieCopy);
      }
    }
  };

  return (
    <div>
      <Navbar />
      <div className="main-container">
        <Alert />
        <Submit
          changeInput={changeInput}
          addGrocerie={addGrocerie}
          input={input}
        />
        <List
          grocerieList={grocerieList}
          deleteItem={deleteItem}
          emptyList={emptyList}
          isEditing={isEditing}
          changeEdit={changeEdit}
        />
      </div>
    </div>
  );
}

export default App;
