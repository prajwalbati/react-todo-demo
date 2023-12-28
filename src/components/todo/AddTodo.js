import React, { useState } from 'react';

import sendRequest from '../../utils/fetchRequest';
import Errors from '../Errors';

const AddTodo = ({ addDispatch }) => {
    const [todo, setTodo] = useState('');
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState([]);

    const addTodo = async (e) => {
        e.preventDefault();

        setLoading(true);
        try {
            let response = await sendRequest('/api/todos/create', 'POST', true, JSON.stringify({title: todo}));
            let resJson = await response.json();
            if (!response.ok) {
                if (response.status === 422) {
                    setErrors(resJson);
                }
            } else {
                setTodo('');
                setLoading(false);
                addDispatch({type: 'addTodo', payload: resJson})
            }
        } catch (err) {
            console.log(err);
            setLoading(false);
        }
    };

    return (
        <form onSubmit={addTodo} className="add-items d-flex">
            <Errors errors={errors}></Errors>
            <input value={todo} onChange={(e) => setTodo(e.target.value)} type="text" className="form-control todo-list-input" placeholder="What do you need to do today?" required />
            <button className="add btn btn-primary font-weight-bold todo-list-add-btn" type="submit"  disabled={loading?true:false}>{ loading ? 'Adding' : 'Add' }</button>
        </form>
    );
}

export default AddTodo;