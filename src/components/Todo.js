import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

import AddTodo from './AddTodo';

const Todo = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState([]);
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    getTodos();
  }, [])

  const getTodos = async () => {
    try {
      let response = await fetch('https://express-todo-mway.onrender.com/api/todos', {
        method: 'GET',
        headers: {
            "Authorization": `Bearer ${window.localStorage.accesstoken}`,
        },
      });
      if (response.status === 401) {
        navigate("/login");
        return;
      }
      let resJson = await response.json();
      setTodos(resJson.data);
    } catch (err) {
      console.log(err);
      navigate("/login");
    }
  }

  return (
    <div className="card-body">
      <h4 className="card-title">Awesome Todo list</h4>
      <AddTodo fetchTodos={getTodos}></AddTodo>
        <div className="list-wrapper">
            <ul className="d-flex flex-column-reverse todo-list">
              {todos && todos.length > 0 &&
                <>
                {todos.map(todo => {
                  return <li key={todo._id} className={todo.is_completed?'completed':''}>
                      <div className="form-check">
                        <label className="form-check-label">
                        <input className="checkbox" type="checkbox" checked={todo.is_completed ? true : false} /> {todo.title} <i className="input-helper"></i>
                        </label>
                      </div>
                      <i className="remove mdi mdi-close-circle-outline"></i>
                    </li>
                  })}
                </>
              }
            </ul>
        </div>
    </div>
  );
};

export default Todo;