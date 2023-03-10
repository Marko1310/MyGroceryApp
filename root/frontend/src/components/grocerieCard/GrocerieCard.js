import React, { useState, useRef } from "react";
import "./GrocerieCard.css";

const GrocerieCard = ({ eachGrocerie, user, updateGroceires }) => {
  const [content, setContent] = useState(eachGrocerie.title);
  const [edit, setEdit] = useState(false);
  const input = useRef(null);

  const changeContent = function () {
    // input.current.focus(); --> SO MOBILE VERSION CAN WORK, RETURN FOR DESKTOP
    setEdit(edit ? false : true);
    if (!edit) {
      setContent("");
    } else {
      if (content === "") setContent(eachGrocerie.title);
      fetch(
        `https://mygrocerieapp-api.onrender.com/profile/${user.id}/editgrocerie`,
        {
          // method: "put", --> SO MOBILE VERSION CAN WORK, RETURN FOR DESKTOP
          method: "post",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({
            title: content,
            grocerie_id: eachGrocerie.id,
          }),
        }
      )
        .then((response) => {
          if (response) {
            updateGroceires();
          }
        })
        .catch((err) => console.log(err));
    }
  };

  const deleteCard = function () {
    fetch(`https://mygrocerieapp-api.onrender.com/profile/${user.id}/delete`, {
      method: "delete",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ grocerie_id: eachGrocerie.id }),
    })
      .then((response) => {
        if (response) updateGroceires();
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
