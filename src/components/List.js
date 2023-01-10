import React from "react";
const List = ({ grocerieList, emptyList }) => {
  return (
    <div className="grocery-list-container">
      {grocerieList.map((grocerie) => {
        // const id = new Date().getTime().toString();
        const id = Math.random();
        return (
          <ul key={id}>
            <li className="grocery-list-item">
              <div>{grocerie}</div>
              <div className="submit-buttons">
                <button className="submit-btn edit">Confirm</button>
                <button className="submit-btn delete">Delete</button>
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
