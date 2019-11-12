import * as actionCreators from '../actions/actionCreators.js'
const initState = {
    todoLists: []
};

const todoListReducer = (state = initState, action) => {
    switch (action.type) {
        case actionCreators.CREATE_TODO_LIST:
            console.log("create a new todo list", action.todoList);
            return{
                ...state,
                todoLists: [...state.todoLists, action.todoList],
            }
        case actionCreators.CREATE_TODO_LIST_ERROR:
            return{
                ...state,
                createError: action.err.message,
            }
        /* IF YOU HAVE ANY TODO LIST EDITING REDUCERS ADD THEM HERE */ 
        default:
            return state;
            break;
    }
};

export default todoListReducer;