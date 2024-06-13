import React, { useEffect, useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaRegCheckCircle } from "react-icons/fa";

const Todolist = () => {
  const [toDo, setToDo] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const myDataBase = "https://playground.4geeks.com/todo/users/Paola";

  const fetchData = async () => {
    try {
      const respons = await fetch(myDataBase);
      if (respons.status === 404) {
        await fetch(myDataBase, {
          method: "POST",
          headers: { accept: "application/json" },
        });
      } else {
        const data = await respons.json();
        setToDo(data.todos);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };
  const handleAddTodo = async () => {
    if (inputValue.trim()) {
      const newTask = { label: inputValue.trim(), is_done: false };
      try {
        const respons = await fetch(
          "https://playground.4geeks.com/todo/todos/Paola",
          {
            method: "POST",
            headers: {
              accept: "application/json",
              "Content-type": "application/json",
            },
            body: JSON.stringify(newTask),
          }
        );
        const data = await respons.json();
        setToDo([...toDo, data]);
        setInputValue("");
      } catch (error) {
        console.log(error);
      }
    }
  };
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleAddTodo();
    }
  };
  const handleCheckTodo = async (index) => {
    const taskToCheck = toDo[index];
    const upDateTask = { ...taskToCheck, is_done: true };
    try {
      const respons = await fetch(
        `https://playground.4geeks.com/todo/todos/${taskToCheck.id}`,
        {
          method: "PUT",
          headers: {
            accept: "application/json",
            "Content-type": "application/json",
          },
          body: JSON.stringify(upDateTask),
        }
      );
      const data = await respons.json();
      const updatedTodoList = toDo.map((task, i) =>
        i === index ? data : task
      );
      setToDo(updatedTodoList);
    } catch (error) {
      console.log(error);
    }
  };
  const handleDeleteTodo = async (index) => {
    const taskToDelete = toDo[index];
    try {
      const respons = await fetch(
        `https://playground.4geeks.com/todo/todos/${taskToDelete.id}`,
        {
          method: "DELETE",
          headers: {
            accept: "application/json",
            "Content-type": "application/json",
          },
        }
      );
      const newTodoList = toDo.filter((_, i) => i !== index);
      setToDo(newTodoList);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="container mt-5">
      <div className="w-50  my-auto mb-3">
        <input
          type="text"
          className="form-control"
          value={inputValue}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          name="Task"
          placeholder="Add a new task"
          style={{ border: "none", boxShadow: "none" }}
        />
      </div>
      <ul className="ps-0">
        {toDo.map((todo, index) => (
          <li
            key={index}
            className="d-flex justify-content-between align-items-center mb-2"
            style={{
              padding: "5px",
              margin: "0 auto",
            }}
          >
            {todo.label}
            <div className="justify-content-end">
              <button
                className="btn btn-success"
                onClick={() => handleCheckTodo(index)}
              >
                <FaRegCheckCircle />
              </button>
              <button
                className="btn btn-danger "
                onClick={() => handleDeleteTodo(index)}
              >
                <FaRegTrashAlt />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todolist;
