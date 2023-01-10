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

  const addGrocerie = function () {
    setGrocerieList((prevGrocerieList) => {
      return [...prevGrocerieList, input];
    });
    setInput("");
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
        <List />
      </div>

      {/* <div className="section-center"></div>;
      <div className="section-center"></div>; */}
    </div>
  );
}

export default App;
