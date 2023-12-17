import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

const AddTodo = ({ fetchTodos }) => {
    const navigate = useNavigate();
    const [todo, setTodo] = useState('');
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState([]);

    const addTodo = async (e) => {
        e.preventDefault();

        setLoading(true);

        try {
            let response = await fetch('https://express-todo-mway.onrender.com/api/todos/create', {
                method: 'POST',
                headers: {
                    "Authorization": `Bearer ${window.localStorage.accesstoken}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({title: todo})
            });
            if (!response.ok) {
                if (response.status === 401) {
                    navigate("/login");
                }
                if (response.status === 422) {
                    let resJson = await response.json();
                    setErrors(resJson);
                }
                return;
            } else {
                setTodo('');
                setLoading(false);
                fetchTodos();
            }
        } catch (err) {
            console.log(err);
            setLoading(false);
        }
    };

    const getErrorsList = () => {
        if (errors && errors.length > 0) {
            let errorElem = errors.map((err, index) => {
                return <div className="row" key={index}>
                    <div className="col-sm-12">
                        <div className="alert alert-danger text-center" role="alert">
                            {err.msg}
                        </div>
                    </div>
                </div>
            });
            return errorElem;
        }
        return null;
    }

    return (
        <form onSubmit={addTodo} className="add-items d-flex">
            {getErrorsList()}
            <input value={todo} onChange={(e) => setTodo(e.target.value)} type="text" className="form-control todo-list-input" placeholder="What do you need to do today?" required />
            <button className="add btn btn-primary font-weight-bold todo-list-add-btn" type="submit"  disabled={loading?true:false}>{ loading ? 'Adding' : 'Add' }</button>
        </form>
    );
}

export default AddTodo;