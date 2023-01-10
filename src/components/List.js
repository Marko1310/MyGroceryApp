import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
const List = () => {
  return (
    <div className="grocery-list-container">
      <ul>
        <li className="grocery-list-item">
          <div>fssfkls</div>
          <div className="submit-buttons">
            <button className="submit-btn edit">Confirm</button>
            <button className="submit-btn delete">Delete</button>
          </div>
        </li>
        <li className="grocery-list-item">
          <div>fssfkls</div>
          <div className="submit-buttons">
            <button className="submit-btn edit">Edit</button>
            <button className="submit-btn delete">Delete</button>
          </div>
        </li>
      </ul>
      <div className="clear-btn">Clear list</div>
    </div>
  );
};

export default List;
