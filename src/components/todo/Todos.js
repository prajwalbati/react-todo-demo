import React, { useEffect, useReducer} from 'react';

import { initialTodo, todoReducer } from '../../reducers/todoReducer';
import sendRequest from '../../utils/fetchRequest';
import AddTodo from './AddTodo';
import TodoList from './TodoList';

const Todo = () => {
    const [state, dispatch] = useReducer(todoReducer, initialTodo);
    const { loading, todos } = state;

    useEffect(() => {
        const getTodos = async () => {
            try {
                let response = await sendRequest('/api/todos', 'GET', true);
                let resJson = await response.json();
                dispatch({ type: 'initialLoad', payload: resJson.data });
            } catch (err) {
                console.log(err);
            }
        };
        getTodos();
    }, []);

    return (
        <div className="card-body">
            <h4 className="card-title">Awesome Todo list</h4>
            <AddTodo addDispatch={dispatch}></AddTodo>
            <div className="list-wrapper">
                {loading && <p>Todos loading...</p>}
                <TodoList todos={todos} dispatch={dispatch}></TodoList>
            </div>
        </div>
    );
};

export default Todo;