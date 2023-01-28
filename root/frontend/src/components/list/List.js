import React from "react";
import "./List.css";

const List = ({
  grocerieList,
  deleteItem,
  emptyList,
  changeEdit,
  changeInputEdit,
  inputEdit,
  currentBtn,
  currentID,
}) => {
  return (
    <div className="grocery-list-container">
      {grocerieList.map((grocerie) => {
        return (
          <ul key={grocerie.id}>
            <li className="grocery-list-item">
              {grocerie.edit === false ? (
                <div>{grocerie.title}</div>
              ) : (
                <input
                  type="text"
                  id="grocery"
                  name="grocery"
                  placeholder={grocerie.title}
                  value={inputEdit}
                  className="submit-edit"
                  onChange={(e) => changeInputEdit(e)}
                ></input>
              )}{" "}
              <div className="submit-buttons">
                <button
                  className={
                    grocerie.edit ? `submit-btn confirm` : `submit-btn edit`
                  }
                  onClick={(e) => {
                    changeEdit(grocerie.id);
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
      })}
      <div className="clear-btn" onClick={emptyList}>
        Clear list
      </div>
    </div>
  );
};

export default List;
