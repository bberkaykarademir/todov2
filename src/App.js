import React, { useEffect, useRef, useState } from "react";
import TodoItem from "./TodoItem";
import { v4 as uuidv4 } from "uuid";

const App = () => {
  // const [todos, setTodos] = useState([]);
  const [todoValue, setTodoValue] = useState("");
  const [editing, setEditing] = useState(false);
  const [editingTodo, setEditingTodo] = useState(null);
  const inputRef = useRef();
  const submitHandler = (e) => {
    if (editing) {
      e.preventDefault();
      editItem();
      setEditingTodo(null);
      setEditing(false);
      setTodoValue("");
    } else {
      e.preventDefault();
      setTodos([
        ...todos,
        {
          id: uuidv4(),
          text: todoValue,
          checked: false,
        },
      ]);
      setTodoValue("");
    }
  };
  const setCheck = (e, id) => {
    const checkedTodo = todos.find((todo) => todo.id == id);
    setTodos(
      todos.map((todo) => {
        if (todo.id === checkedTodo.id) {
          if (checkedTodo.checked == false) {
            return { ...todo, checked: true };
          } else {
            return { ...todo, checked: false };
          }
        }
        return todo;
      })
    );
  };
  const editItem = () => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === editingTodo.id) {
          return { ...todo, text: todoValue };
        }
        return todo;
      })
    );
  };
  const prepareEditing = (id) => {
    setEditing(true);
    setEditingTodo(todos.find((todo) => todo.id == id));
    setTodoValue(todos.find((todo) => todo.id == id).text);
    inputRef.current.focus();
  };
  const deleteItem = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const getLocal = () => {
    setTodos(JSON.parse(localStorage.getItem("todos")));
  };

  const setLocal = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };
  const [todos, setTodos] = useState(() => {
    return localStorage.getItem("todos")
      ? JSON.parse(localStorage.getItem("todos"))
      : [];
  });
  useEffect(() => {
    setLocal();
    getLocal();
  }, []);
  useEffect(() => {
    setLocal();
  }, [todos]);

  return (
    <div>
      <h1>Todo List</h1>
      <form onSubmit={(e) => submitHandler(e)} className="inputsec">
        <input
          ref={inputRef}
          type="text"
          onChange={(e) => {
            setTodoValue(e.target.value);
          }}
          value={todoValue}
        />
        <button
          className="submit"
          disabled={todoValue.trim().length < 1 || 33 < todoValue.trim().length}
        >
          Add Todo
        </button>
      </form>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          id={todo.id}
          deleteItem={deleteItem}
          setCheck={setCheck}
          prepareEditing={prepareEditing}
          editing={editing}
        />
      ))}
    </div>
  );
};

export default App;
