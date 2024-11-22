"use client";
import React, { useState, useEffect } from "react";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos"));
    if (storedTodos) {
      setTodos(storedTodos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (e) => {
    e.preventDefault();
    if (input.trim()) {
      setTodos([...todos, { text: input, completed: false }]);
      setInput("");
    }
  };
  const removeTodo = (index) => {
    const newTodos = todos.filter((_, i) => i !== index); // Remove task at specific index
    setTodos(newTodos);
  };

  const toggleTodo = (index) => {
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed; // Toggle completed status
    setTodos(newTodos);
  };

  return (
    <div className="row">
      <div className="col-md-12">
        <div className="card">
          <div className="row">
            <div className="col-md-6">
              <h1>Ngapain Luwh</h1>
              <p>
                Merupakan sebuah website untuk melakukan pencatatan kegiatan
                yang sedang dilakukan.
              </p>
              <form onSubmit={addTodo}>
                <input
                  type="text"
                  className="form-control todo-input"
                  placeholder="Ngapain Luwh?"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                />
                <button
                  type="submit"
                  className="btn btn-primary bg-yellow w-100"
                >
                  Tambah Kegiatan
                </button>
              </form>
            </div>
            <div className="col-md-6">
              <div id="todoList" className="mt-3">
                {todos.map((todo, index) => (
                  <li key={index} className="todo-item">
                    <span
                      className={`${
                        todo.completed ? "todo-item-completed" : ""
                      }`}
                    >
                      {todo.text}
                    </span>
                    <button
                      className="btn btn-sm"
                      onClick={() => toggleTodo(index)}
                    >
                      {todo.completed ? "Belum" : "Selesai"}
                    </button>
                    <button
                      className="btn btn-sm"
                      onClick={() => removeTodo(index)}
                    >
                      Hapus
                    </button>
                  </li>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoList;
