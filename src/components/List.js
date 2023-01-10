import React from "react";

const List = ({ grocerieList, deleteItem, emptyList }) => {
  const { title, id } = grocerieList;
  return (
    <div className="grocery-list-container">
      {grocerieList.map((grocerie) => {
        return (
          <ul key={grocerie.id}>
            <li className="grocery-list-item">
              <div>{grocerie.title}</div>
              <div className="submit-buttons">
                <button className="submit-btn edit">Confirm</button>
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
