import React from 'react';
import Loadable from 'react-loadable';
import dynamic from '../utils/dynamic';
import Root from '../components/root/index';

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
    component: Root,
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


// export default [{
//     component: App,
//     routes: [
//         {
//             path: '/',
//             component: dynamic(() => import(/* webpackChunkName: 'home' */ './home/HomePage')),
//             exact: true
//         }, {
//             path: '/todo',
//             component: dynamic(() => import(/* webpackChunkName: 'todo' */ './todo/TodoPage'))
//         }, {
//             path: '/contact',
//             component: dynamic(() => import(/* webpackChunkName: 'contact' */ './contact/ContactPage'))
//         }, {
//             component: dynamic(() => import(/* webpackChunkName: 'not-found' */ './others/NotFoundPage'))
//         }
//     ]
// }];

