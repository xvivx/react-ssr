import React from 'react';
import ToDoItem from './ToDoItem.js';

export default (props) => {
    const {todos, dispatchToggleTodo, dispatchDeleteTodo, visibility} = props;
    return (
        <div className="panel panel-default">
            <div className="panel-heading">待办事件列表</div>
            <div className="panel-body">
                <p>今日事今日毕今日事今日毕今日事今日毕今日事今日毕今日事今日毕今日事今日毕今日事今日毕</p>
            </div>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>事件名</th>
                        <th>状态</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                {
                    todos.map((item, index) => (
                        <ToDoItem
                            key={index}
                            index={index}
                            visibility={visibility}
                            {...item}
                            toggleClick={e => dispatchToggleTodo(index)}
                            deleteClick={e => dispatchDeleteTodo(index)}
                        />
                    ))
                }
                </tbody>
            </table>
        </div>
    );
};