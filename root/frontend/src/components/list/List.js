import React from "react";
import "./List.css";
import GrocerieCard from "../grocerieCard/GrocerieCard";

function List({
  user,
  groceries,
  deleteGrocerie,
  editGrocerieList,
  updateGroceires,
}) {
  // function to remove all groceries
  const emptyList = function () {
    if (window.confirm("Are you sure you want to delete all the groceries?")) {
      fetch(`http://localhost:3001/profile/${user.id}/clearList`, {
        method: "delete",
      })
        .then((response) => {
          if (response) {
            updateGroceires();
          }
        })
        .catch((err) => console.log(err));
    }
  };

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
            updateGroceires={updateGroceires}
          />
        );
      })}

      <div className="clear-btn" onClick={emptyList}>
        Clear list
      </div>
    </div>
  );
}

export default List;
