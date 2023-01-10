import React from "react";

const List = ({
  grocerieList,
  deleteItem,
  emptyList,
  changeEdit,
  changeInput,
}) => {
  const { title, id, edit } = grocerieList;
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
                  placeholder="e.g. banana"
                  // value={input}
                  className="submit-input"
                  onChange={(e) => changeInput(e)}
                ></input>
              )}{" "}
              <div className="submit-buttons">
                <button
                  className="submit-btn edit"
                  onClick={() => changeEdit(grocerie.id)}
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
