import React from 'react';
import Loadable from 'react-loadable';
import App from './App';

var Loading = (props) => <div>Loading...</div>;

var Home =  Loadable({
    loading: Loading,
    loader: () => import(/* webpackChunkName: 'home' */ './home/HomePage'), 
});

var Todo =  Loadable({
    loading: Loading,
    loader: () => import(/* webpackChunkName: 'todo' */ './todo/TodoPage'), 
});

var ContactUs = Loadable({
    loading: Loading,
    loader: () => import(/* webpackChunkName: 'contact' */ './contact/ContactPage'), 
});

var NotFound = Loadable({
    loading: Loading,
    loader: () => import(/* webpackChunkName: 'not-found' */ './others/NotFoundPage'), 
});



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
        }, {
            path: '/contact',
            component: ContactUs
        }, {
            component: NotFound
        }
    ]
}];

