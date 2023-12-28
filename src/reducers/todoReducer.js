const todoReducer = (state, action) => {
    switch (action.type) {
        case 'initialLoad':
            return { ...state,
                loading: false,
                todos: action.payload
            }
        case 'addTodo':
            return {
                ...state,
                todos: [
                    ...state.todos,
                    {
                        _id: action.payload._id,
                        title: action.payload.title,
                        is_completed: action.payload.is_completed
                    }
                ]
            };
        case 'updateTodo':
            let updatedList = state.todos.map(todo => {
                if (todo._id === action.payload._id) {
                    todo.is_completed = action.payload.is_completed;
                }
                return todo;
            });
            return {
                ...state,
                todos: updatedList
            };
        case 'deleteTodo':
            let todos = state.todos.filter(todo => {
                return todo._id !== action.payload._id;
            });
            return {
                ...state,
                todos
            };
        default:
            break;
    }
    return state;
};

const initialTodo = {
    loading: true,
    todos: []
};

export { todoReducer, initialTodo };