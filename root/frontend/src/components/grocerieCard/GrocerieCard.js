import React, { useState, useRef } from "react";
import "./GrocerieCard.css";

const GrocerieCard = ({ eachGrocerie, deleteItem }) => {
  const [content, setContent] = useState(eachGrocerie.title);
  const [editContent, setEditContent] = useState(content);
  const id = eachGrocerie.id;
  const [edit, setEdit] = useState(false);
  const input = useRef(null);

  const changeContent = function () {
    input.current.focus();
    setEdit(edit ? false : true);
    if (!edit) setContent("");
    setEditContent(content);
    if (content === "") setContent(editContent);
  };

  return (
    <div className="grocery-list-item">
      {/* {grocerie.edit === false ? (
              <div>{grocerie.title}</div>
            ) : ( */}
      <input
        ref={input}
        type="text"
        placeholder={editContent}
        value={content}
        className="submit-edit"
        onChange={(e) => setContent(e.target.value)}
        readOnly={!edit}
      ></input>
      <div className="submit-buttons">
        <button
          className={edit ? `submit-btn confirm` : `submit-btn edit`}
          onClick={
            changeContent
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
