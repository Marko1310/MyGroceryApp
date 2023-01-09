import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
const List = () => {
  return (
    <ul className="grocery-list-container">
      <li className="grocery-list-item">
        <div>fssfkls</div>
        <div className="submit-buttons">
          <button className="submit-btn edit">Edit</button>
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
  );
};

export default List;
