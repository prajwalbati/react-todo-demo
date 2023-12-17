import React, {useState} from "react";
import { useNavigate } from "react-router-dom";

const SingleTodo = ({todo, fetchTodos}) => {
    const navigate = useNavigate();
    const [isCompleted, setIsCompleted] = useState(todo.is_completed);

    const deleteTodo = async (id) => {
        try {
            let response = await fetch(`https://express-todo-mway.onrender.com/api/todos/${id}`, {
                method: 'DELETE',
                headers: {
                    "Authorization": `Bearer ${window.localStorage.accesstoken}`,
                    "Content-Type": "application/json",
                }
            });
            if (!response.ok) {
                if (response.status === 401) {
                    navigate("/login");
                }
                if (response.status === 400) {
                    // setErrors([{msg: resJson.error}]);
                }
                return;
            } else {
                fetchTodos();
            }
        } catch (err) {
            console.log(err);
        }
    };

    const updateTodo = async (e, id) => {
        const newCompleted = !isCompleted;
      setIsCompleted(newCompleted);
      try {
            let response = await fetch(`https://express-todo-mway.onrender.com/api/todos/${id}`, {
                method: 'PUT',
                headers: {
                    "Authorization": `Bearer ${window.localStorage.accesstoken}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ is_completed: newCompleted })
            });
            if (!response.ok) {
                if (response.status === 401) {
                    navigate("/login");
                }
                if (response.status === 400) {
                    // setErrors([{msg: resJson.error}]);
                }
                return;
            } else {
                fetchTodos();
            }
        } catch (err) {
            console.log(err);
        }
  }
    return (
        <li className={isCompleted?'completed':''}>
            <div className="form-check">
                <label className="form-check-label">
                    <input className="checkbox" type="checkbox" onChange={(e) => updateTodo(e, todo._id)} checked={isCompleted ? true : false} /> {todo.title} <i className="input-helper"></i>
                </label>
            </div>
            <i className="remove mdi mdi-close-circle-outline" onClick={() => deleteTodo(todo._id)}></i>
        </li>
    );
};

export default SingleTodo;