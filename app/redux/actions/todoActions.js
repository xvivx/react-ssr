export const SHOW_ALL = 'SHOW_ALL';
export const SHOW_DONE = 'SHOW_DONE';
export const SHOW_ACTIVE = 'SHOW_ACTIVE';
export const ADD_TODO = 'ADD_TODO';
export const SETVISIBILITY = 'SETVISIBILITY';
export const TOGGLE_TODO_ACTIVE = 'TOGGLE_TODO_ACTIVE';
export const DELETE_TODO = 'DELETE_TODO';

export const addTodo = (text) => {
    return {
        type: ADD_TODO,
        text: text
    };
};

export const setVisibility = (visibilityType) => {
    return {
        type: SETVISIBILITY,
        filter: visibilityType
    };
};

export const toggleTodoActive = (index) => {
    return {
        type: TOGGLE_TODO_ACTIVE,
        index
    };
};

export const deleteTodo = (index) => {
    return {
        type: DELETE_TODO,
        index
    };
};