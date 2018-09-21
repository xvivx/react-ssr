import React from 'react';
import Home from './home/HomePage';
import Todo from './todo/TodoPage';
import App from './App';

export default [{
    component: App,
    routes: [
        {
            path: '/',
            component: Home,
            exact: true
        }, {
            path: '/todo',
            component: Todo
        }
    ]
}];