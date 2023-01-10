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

  // function to update the input state field when entering the que
  const changeInput = function (e) {
    setInput(e.target.value);
  };

  // function to add groceries
  const addGrocerie = function () {
    setGrocerieList((prevGrocerieList) => {
      return [...prevGrocerieList, input];
    });
    setInput("");
  };

  // function to remove all groceries
  const emptyList = function () {
    setGrocerieList([]);
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
        <List grocerieList={grocerieList} emptyList={emptyList} />
      </div>

      {/* <div className="section-center"></div>;
      <div className="section-center"></div>; */}
    </div>
  );
}

export default App;
