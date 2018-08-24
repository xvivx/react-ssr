import React from 'react';


export default props => {
    var input = null;
    var hasBindEvent = false;
    const { dispatchAddTodo, className = '', btnName, placeholder, btnClass = 'btn-default' } = props;
    const handleClick = (e) => {
        var value = input.value;
        if(!value.trim()) {
            console.log('待办事件名不能为空！');
            return false;
        }
        dispatchAddTodo(value);
        input.value = '';
        return false;
    };

    const addEvent = function (node) {
        if(!hasBindEvent) {
            input = node;
            node.onkeyup = function (e) {
                if(e.keyCode === 13) {
                    handleClick();
                }
            };
            hasBindEvent = true;
        }
    };

    return (
        <div className={ `input-group col-lg-6 ${ className }` }>
            <input type="text" className="form-control" placeholder={ placeholder } ref={ addEvent } />
            <span className="input-group-btn">
                <button className={ `btn ${ btnClass }` } type="button" onClick={handleClick}>{ btnName }</button>
            </span>
        </div>
    );
};