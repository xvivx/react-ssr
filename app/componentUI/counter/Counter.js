import React from 'react';

export default props => {
    const { onIncrement, onDecrement, incrementAuto, stopIncrement, reset, counter } = props;
    return (
        <div className="container">
            <div className="panel">点击次数: { counter } 次</div>
            <div className="btn-group btn-group-justified">
                <a href="javascript: void(0)" className="btn btn-info" onClick={ onIncrement }>加一次</a>
                <a href="javascript: void(0)" className="btn btn-warning" onClick={ onDecrement }>减一次</a>
                <a href="javascript: void(0)" className="btn btn-success" onClick={ incrementAuto }>自动增加</a>
                <a href="javascript: void(0)" className="btn btn-default" onClick={ stopIncrement }>停止自增</a>
                <a href="javascript: void(0)" className="btn btn-danger" onClick={ reset }>重置归零</a>
            </div>
        </div>
    );
};