import dynamic from '../utils/dynamic-page';

export default [
    {
        path: '/',
        component: dynamic(import(/* webpackChunkName: 'home' */'../page/HomePage')),
        exact: true,
    }, {
        path: '/todo',
        component: dynamic(() => import(/* webpackChunkName: 'todo' */'../page/ToDoPage'))
    }, {
        path: '/counter',
        component: dynamic(() => import(/* webpackChunkName: 'counter' */'../page/CounterPage'))
    }, {
        path: '/olami',
        component: dynamic(() => import(/* webpackChunkName: 'olami' */'../page/OlamiPage'))
    }, {
        path: '/contract',
        exact: true,
        component: dynamic(() => import(/* webpackChunkName: 'contract' */'../page/contract'))
    }
];