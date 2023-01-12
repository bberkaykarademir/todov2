import React from "react";
import { FaTimes, FaEdit } from "react-icons/fa";

const TodoItem = ({
  todo,
  id,
  deleteItem,
  setCheck,
  prepareEditing,
  editing,
}) => {
  return (
    <div className="item">
      <div>
        <input
          checked={todo.checked == true}
          onChange={(e) => {
            setCheck(e, id);
          }}
          type="checkbox"
        />
        <p className={todo.checked ? "finished" : "todotext"}>{todo.text}</p>
      </div>
      <div className="buttonsec">
        {!editing && (
          <button onClick={() => deleteItem(id)} className="delete">
            <FaTimes />
          </button>
        )}
        {!editing && (
          <button onClick={(e) => prepareEditing(id)} className="edit">
            <FaEdit />
          </button>
        )}
      </div>
    </div>
  );
};

export default TodoItem;
