import React from 'react';
import SingleTodo from './SingleTodo';

const TodoList = ({ todos, fetchTodos }) => {


  return (
    <ul className="d-flex flex-column-reverse todo-list">
      {todos && todos.length > 0 &&
        <>
          {todos.map(todo => {
            return <SingleTodo key={todo._id} todo={todo} fetchTodos={fetchTodos}></SingleTodo>
          })}
        </>
      }
    </ul>
  )
}
export default TodoList