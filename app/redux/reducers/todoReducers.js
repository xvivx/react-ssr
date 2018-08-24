import {combineReducers} from 'redux';
import * as ACTIONS from '../actions/todoActions.js';

const visibility = (state = ACTIONS.SHOW_ALL, action) => {
    switch(action.type) {
        case ACTIONS.SETVISIBILITY:
            return action.filter;
        default:
            return state;
    }
};

const todos = (state = [], action) => {
    switch(action.type) {
        case ACTIONS.ADD_TODO:
            return [
                {
                    todoText: action.text,
                    completed: false
                },
                ...state,
            ];
        case ACTIONS.TOGGLE_TODO_ACTIVE:
            return state.map((item, index) => {
                if(index === action.index) {
                    return Object.assign({}, item, {
                        completed: !item.completed
                    });
                } else {
                    return item;
                }
            });
        case ACTIONS.DELETE_TODO:
            return state.filter((item, index) => index !== action.index);
        default:
            return state;
    }
};

export default ({visibility, todos});