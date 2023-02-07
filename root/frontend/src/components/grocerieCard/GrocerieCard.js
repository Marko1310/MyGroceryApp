import React, { useState, useRef } from "react";
import "./GrocerieCard.css";

const GrocerieCard = ({
  eachGrocerie,
  user,
  editGrocerieList,
  deleteGrocerie,
}) => {
  const [content, setContent] = useState(eachGrocerie.title);
  const id = eachGrocerie.id;
  const [edit, setEdit] = useState(false);
  const input = useRef(null);

  const changeContent = function () {
    input.current.focus();
    setEdit(edit ? false : true);
    if (!edit) {
      setContent("");
    } else {
      if (content === "") setContent(eachGrocerie.title);
      fetch(`http://localhost:3001/profile/${user.id}/editgrocerie`, {
        method: "put",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ title: content, grocerie_id: id }),
      })
        .then((response) => response.json())
        .then((data) => {
          editGrocerieList(data);
        });
    }
  };

  const deleteCard = function () {
    fetch(`http://localhost:3001/profile/${user.id}/delete`, {
      method: "delete",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ grocerie_id: id }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        deleteGrocerie(data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="grocery-list-item">
      <input
        ref={input}
        type="text"
        placeholder={eachGrocerie.title}
        value={content}
        className="submit-edit"
        onChange={(e) => setContent(e.target.value)}
        readOnly={!edit}
      ></input>
      <div className="submit-buttons">
        <button
          className={edit ? `submit-btn confirm` : `submit-btn edit`}
          onClick={() => changeContent()}
        >
          {edit ? "Confirm" : "Edit"}
        </button>

        <button className="submit-btn delete" onClick={() => deleteCard()}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default GrocerieCard;
