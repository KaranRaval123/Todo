import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [todos, setTodos] = useState<string[]>([]);
  const [input, setInput] = useState<string>("");
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const HandleAddItem = () => {
    if (input) {
      setTodos([...todos, input]);
      setInput("");
    }
  };

  const HandleDeleteTodo = (index: number) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  };

  const HandleEditTodo = (index: number) => {
    setEditingIndex(index);
  };

  const HandleEditChange = (index: number, newValue: string) => {
    const updatedTodos = [...todos];
    updatedTodos[index] = newValue;
    setTodos(updatedTodos);
  };

  const HandleSaveEdit = (index: number) => {
    setEditingIndex(null);
  };

  const HandleToggleComplete = (index: number) => {
    const updatedTodos = [...todos];
    updatedTodos[index] = `✅ ${updatedTodos[index]}`;
    setTodos(updatedTodos);
  };

  const HandleClearCompleted = () => {
    const updatedTodos = todos.filter((todo) => !todo.startsWith("✅"));
    setTodos(updatedTodos);
  };

  return (
    <div className="container">
      <div className="input-container">
        <input
          type="text"
          className="edit-input"
          onChange={(e) => setInput(e.target.value)}
          value={input}
          placeholder="Add a new todo"
        />
        <button className="btn" onClick={HandleAddItem}>
          Add
        </button>
        <button className="btn" onClick={HandleClearCompleted}>
          Clear Completed
        </button>
      </div>
      <div>
        <ul className="todo-list">
          {todos.map((todo, index) => (
            <li key={index} className="todo-item">
              {editingIndex === index ? (
                <div>
                  <input
                    type="text"
                    className="edit-input"
                    value={todo}
                    onChange={(e) => HandleEditChange(index, e.target.value)}
                  />
                  <button className="btn" onClick={() => HandleSaveEdit(index)}>
                    Save
                  </button>
                </div>
              ) : (
                <div className={todo.startsWith("✅") ? "completed" : ""}>
                  {todo}
                  <button className="btn" onClick={() => HandleEditTodo(index)}>
                    Edit
                  </button>
                  <button
                    className="btn"
                    onClick={() => HandleDeleteTodo(index)}
                  >
                    Delete
                  </button>
                  <button
                    className="btn"
                    onClick={() => HandleToggleComplete(index)}
                  >
                    Complete
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
