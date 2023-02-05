import React, { useState } from "react";
import "./List.css";
import GrocerieCard from "../grocerieCard/GrocerieCard";

const List = ({
  user,
  groceries,
  deleteItem,
  emptyList,
  changeGrocerie,
  input,
  changeInput,
  currentBtn,
  currentID,
  editRef,
}) => {
  return (
    <div className="grocery-list-container">
      {groceries.map((eachGrocerie) => {
        return (
          <GrocerieCard
            eachGrocerie={eachGrocerie}
            deleteItem={deleteItem}
            user={user}
          />
        );
      })}

      {/* {grocerieList.map((grocerie) => {
        return (
          <ul key={grocerie.id}>
            <li className="grocery-list-item">
              {grocerie.edit === false ? (
                <div>{grocerie.title}</div>
              ) : ( *
              <input
                ref={editRef}
                type="text"
                placeholder={grocerie.title}
                value={input}
                className="submit-edit"
                onChange={(e) => changeInput(e)}
                readOnly={grocerie.edit}  
              ></input>
              <div className="submit-buttons">
                <button
                  className={
                    grocerie.edit ? `submit-btn confirm` : `submit-btn edit`
                  }
                  onClick={() => {
                    changeGrocerie(grocerie.id);
                  }}
                  disabled={currentID !== grocerie.id && currentBtn}
                >
                  {grocerie.edit ? "Confirm" : "Edit"}
                </button>

                <button
                  className="submit-btn delete"
                  onClick={() => deleteItem(grocerie.id)}
                >
                  Delete
                </button>
              </div>
            </li>
          </ul>






        );
      })} */}
      <div className="clear-btn" onClick={emptyList}>
        Clear list
      </div>
    </div>
  );
};

export default List;
