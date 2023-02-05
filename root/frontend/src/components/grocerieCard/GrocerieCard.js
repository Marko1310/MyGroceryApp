import React, { useState, useRef } from "react";
import "./GrocerieCard.css";

const GrocerieCard = ({ eachGrocerie, deleteItem, user }) => {
  const [content, setContent] = useState(eachGrocerie.title);
  const [prevContent, setPrevContent] = useState(content);
  const id = eachGrocerie.id;
  const [edit, setEdit] = useState(false);
  const input = useRef(null);

  const changeContent = function () {
    // console.log(typeof JSON.parse(content));
    input.current.focus();
    setEdit(edit ? false : true);
    if (!edit) {
      setContent("");
    } else {
      setPrevContent(content);
      if (content === "") setContent(prevContent);

      fetch(`http://localhost:3001/profile/1/editgrocerie`, {
        method: "put",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ title: content, grocerie_id: id }),
      });
    }
  };

  return (
    <div className="grocery-list-item">
      {/* {grocerie.edit === false ? (
              <div>{grocerie.title}</div>
            ) : ( */}
      <input
        ref={input}
        type="text"
        placeholder={prevContent}
        value={content}
        className="submit-edit"
        onChange={(e) => setContent(e.target.value)}
        readOnly={!edit}
      ></input>
      <div className="submit-buttons">
        <button
          className={edit ? `submit-btn confirm` : `submit-btn edit`}
          onClick={
            () => changeContent()
            // changeGrocerie(grocerie.id);
          }
          // disabled={currentID !== grocerie.id && currentBtn}
        >
          {edit ? "Confirm" : "Edit"}
        </button>

        <button className="submit-btn delete" onClick={() => deleteItem(id)}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default GrocerieCard;

// const GrocerieCard = ({ grocerieList }) => {
//   return grocerieList.map((grocerie) => {
//     return (
//       <ul key={grocerie.id}>
//         <li className="grocery-list-item">
//           {/* {grocerie.edit === false ? (
//                 <div>{grocerie.title}</div>
//               ) : ( */}
//           <input
//             ref={editRef}
//             type="text"
//             placeholder={grocerie.title}
//             value={input}
//             className="submit-edit"
//             onChange={(e) => changeInput(e)}
//             readOnly={grocerie.edit}
//           ></input>
//           <div className="submit-buttons">
//             <button
//               className={
//                 grocerie.edit ? `submit-btn confirm` : `submit-btn edit`
//               }
//               onClick={() => {
//                 changeGrocerie(grocerie.id);
//               }}
//               disabled={currentID !== grocerie.id && currentBtn}
//             >
//               {grocerie.edit ? "Confirm" : "Edit"}
//             </button>

//             <button
//               className="submit-btn delete"
//               onClick={() => deleteItem(grocerie.id)}
//             >
//               Delete
//             </button>
//           </div>
//         </li>
//       </ul>
//     );
//   });
// };
