import React from 'react';
import { formatDate } from 'idiv-utils';

import AddTodo from '../componentUI/todo/AddTodo';
import ToDoList from '../componentUI/todo/ToDoList';
import FooterFilter from '../componentUI/todo/FooterFilter';
import todoHOC from '../container/todo/todoHOC';


export default todoHOC(props => {
    const {dispatchAddTodo, dispatchFilter, ...others} = props;

    return (
        <div className="container">
            <div className="page-header">
                <h1>勇往直前 <small>你的指尖，有改变世界的力量</small></h1>
            </div>
            <AddTodo 
                dispatchAddTodo={ dispatchAddTodo }
                btnName="添加"
                placeholder="请输入您的待办事件名"
            />
            <FooterFilter dispatchFilter={dispatchFilter} todos={props.todos} />
            <ToDoList {...others} />
        </div>
    );
});