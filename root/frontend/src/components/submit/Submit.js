import React, { useState, useEffect } from "react";

import "./Submit.css";

function Submit({ updateGroceires, user }) {
  // state for input field
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);

  // function to update the input state field when entering the que
  const changeInput = function (e) {
    setInput(e.target.value);
  };

  useEffect(() => updateHistory(), []);

  const updateHistory = function () {
    fetch(`https://mygrocerieapp-api.onrender.com/profile/${user.id}/history/`)
      .then((res) => res.json())
      .then((data) => {
        updateHistoryState(data);
      });
  };

  const updateHistoryState = function (historyList) {
    const groceries = historyList.map((el) => {
      return el;
    });
    setHistory(groceries);
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
        updateGroceires();
        updateHistory();
      })
      .catch((err) => console.log(err));
    setInput("");
  };

  const onSearch = (searchTerm) => {
    setInput(searchTerm);
  };

  // const submitForm = function (event) {
  //   event.preventDefault();
  //   addGrocerie();
  // }

  return (
    <form className="submit-container" onSubmit={addGrocerie}>
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
          {history
            .filter((el) => {
              const searchTerm = input.toLowerCase();
              const grocerie = el.title.toLowerCase();

              return (
                searchTerm &&
                grocerie.startsWith(searchTerm) &&
                grocerie !== searchTerm
              );
            })
            .map((grocerie) => (
              <div
                key={grocerie.id}
                className="list"
                onClick={() => onSearch(grocerie.title)}
              >
                {grocerie.title}
              </div>
            ))}
        </div>
      </div>
      <button className="submit-btn" disabled={input === ""}>
        Submit
      </button>
    </form>
  );
}

export default Submit;
