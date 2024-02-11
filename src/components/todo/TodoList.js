import React from 'react';
import SingleTodo from './SingleTodo';

const TodoList = ({ todos, dispatch }) => {

  return (
    <ul className="d-flex flex-column-reverse todo-list">
      {todos && todos.length > 0 &&
        <>
          {todos.map(todo => {
            return <SingleTodo key={todo._id} todo={todo} dispatch={dispatch}></SingleTodo>
          })}
        </>
      }
    </ul>
  )
}
export default TodoList;