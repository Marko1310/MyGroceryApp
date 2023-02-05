import React, { useState } from "react";
import "./List.css";
import GrocerieCard from "../grocerieCard/GrocerieCard";

const List = ({
  user,
  groceries,
  deleteGrocerie,
  emptyList,
  editGrocerieList,
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
            key={eachGrocerie.id}
            eachGrocerie={eachGrocerie}
            deleteGrocerie={deleteGrocerie}
            user={user}
            editGrocerieList={editGrocerieList}
          />
        );
      })}

      <div className="clear-btn" onClick={emptyList}>
        Clear list
      </div>
    </div>
  );
};

export default List;
