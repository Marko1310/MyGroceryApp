import React, { useState } from "react";

import "./Submit.css";

function Submit({ updateGroceires, user }) {
  // state for input field
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);

  // function to update the input state field when entering the que
  const changeInput = function (e) {
    setInput(e.target.value);
  };

  const updateHistory = function () {
    fetch(`http://localhost:3001/profile/${user.id}/history/`)
      .then((res) => res.json())
      .then((historyList) => {
        const groceries = historyList.map((el) => el.title);
        setHistory(groceries);
      });
  };

  // function to add grocerie
  const addGrocerie = function () {
    fetch(`http://localhost:3001/profile/${user.id}/newGrocerie`, {
      method: "put",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: input,
        date: new Date(),
      }),
    })
      .then((response) => {
        if (response) {
          updateGroceires();
          updateHistory();
        }
      })
      .catch((err) => console.log(err));
    setInput("");
  };

  const groceries = [
    "apple",
    "banana",
    "berry",
    "basmati",
    "apricotaaaaaaaa",
    "water",
    "milk",
  ];

  return (
    <form
      className="submit-container"
      onSubmit={(e) => {
        e.preventDefault();
        addGrocerie();
      }}
    >
      <div className="submit-input-field">
        <input
          type="text"
          id="grocery"
          name="grocery"
          placeholder="e.g. banana"
          value={input}
          className="submit-input"
          onChange={(e) => changeInput(e)}
        ></input>
        <div className="list-container">
          {groceries
            .filter((el) => el.startsWith(input))
            .map((el) => (
              <div className="list">{el}</div>
            ))}
        </div>
      </div>
      <input
        type="submit"
        value="Submit"
        className="submit-btn"
        disabled={input === ""}
      ></input>
    </form>
  );
}

export default Submit;
