import dynamic from '../utils/dynamic-page';

export default [
    {
        path: '/',
        component: dynamic(import('../page/home/HomePage')),
        exact: true,
    }, {
        path: '/todo',
        component: dynamic(() => import('../page/todo/ToDoPage'))
    }, {
        path: '/counter',
        component: dynamic(() => import('../page/CounterPage'))
    }, {
        path: '/olami',
        component: dynamic(() => import('../page/OlamiPage'))
    }
];