import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from "react-router-dom";

import sendRequest from '../../utils/fetchRequest';
import AddTodo from './AddTodo';
import TodoList from './TodoList';

const Todo = () => {
  const navigate = useNavigate();
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  const getTodos = useCallback(async () => {
    try {

      let response = await sendRequest('/api/todos', 'GET', true);
      let resJson = await response.json();
      setTodos(resJson.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    getTodos();
  }, [getTodos]);

  return (
    <div className="card-body">
      <h4 className="card-title">Awesome Todo list</h4>
      <AddTodo fetchTodos={getTodos}></AddTodo>
      <div className="list-wrapper">
        {loading && <p>Todos loading...</p>}
            <TodoList todos={todos} fetchTodos={getTodos}></TodoList>
        </div>
    </div>
  );
};

export default Todo;