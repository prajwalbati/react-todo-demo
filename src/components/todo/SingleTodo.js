import React, {useState} from "react";

import sendRequest from "../../utils/fetchRequest";

const SingleTodo = ({todo, dispatch}) => {
    const [isCompleted, setIsCompleted] = useState(todo.is_completed);
    const [disabled, setDisabled] = useState(false);

    const deleteTodo = async (id) => {
        setDisabled(true);
        try {
            await sendRequest(`/api/todos/${id}`, 'DELETE', true);
            dispatch({ type: 'deleteTodo', payload: { _id: id } });
        } catch (err) {
            setDisabled(false);
            console.log(err);
        }
    };

    const updateTodo = async (e, id) => {
        const newCompleted = !isCompleted;
        setIsCompleted(newCompleted);
        try {
            await sendRequest(`/api/todos/${id}`, 'PUT', true, JSON.stringify({ is_completed: newCompleted }));
            dispatch({ type: 'updateTodo', payload: { _id: id, is_completed: newCompleted } });
        } catch (err) {
            console.log(err);
            setIsCompleted(!newCompleted);
        }
    }

    return (
        <li className={isCompleted?'completed':''}>
            <div className="form-check">
                <label className="form-check-label">
                    <input className="checkbox" type="checkbox" onChange={(e) => updateTodo(e, todo._id)} checked={isCompleted ? true : false} /> {todo.title} <i className="input-helper"></i>
                </label>
            </div>
            <button className="remove btn btn-link" onClick={() => deleteTodo(todo._id)} disabled={disabled}><i className="fa fa-times"></i></button>
        </li>
    );
};

export default SingleTodo;