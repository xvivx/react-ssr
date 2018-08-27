import dynamic from '../utils/dynamic-page';

export default [
    // {
    //     path: '/',
    //     component: dynamic(import(/* webpackChunkName: 'home' */'../page/home/HomePage')),
    //     exact: true,
    // }, {
    //     path: '/todo',
    //     component: dynamic(import(/* webpackChunkName: 'todo' */'../page/todo/ToDoPage'))
    // }, 
    
    {
        path: '/counter',
        component: dynamic(() => import(/* webpackChunkName: 'counter' */'../page/CounterPage'))
    }, {
        path: '/olami',
        component: dynamic(() => import(/* webpackChunkName: 'olami' */'../page/OlamiPage'))
    }
];