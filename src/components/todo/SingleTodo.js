import React, {useState} from "react";

import sendRequest from "../../utils/fetchRequest";

const SingleTodo = ({todo, fetchTodos}) => {
    const [isCompleted, setIsCompleted] = useState(todo.is_completed);

    const deleteTodo = async (id) => {
        try {
            let response = await sendRequest(`/api/todos/${id}`, 'DELETE', true);
            if (response.ok) {
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
            let response = await sendRequest(`/api/todos/${id}`, 'PUT', true, JSON.stringify({ is_completed: newCompleted }));
            if (!response.ok) {
                setIsCompleted(!newCompleted);
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