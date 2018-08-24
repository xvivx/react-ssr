import React from 'react';
import {SHOW_ALL, SHOW_ACTIVE, SHOW_DONE} from '../../redux/actions/todoActions';

export default (props) => {
    const {toggleClick, deleteClick, todoText, completed, visibility} = props;
    const className = completed ? 'progress-bar-success' : 'progress-bar-warning';
    var isShow = false;

    if(visibility === SHOW_DONE) {
        isShow = completed === true;
    } else if(visibility === SHOW_ACTIVE) {
        isShow = completed === false;
    } else if(visibility === SHOW_ALL) {
        isShow = true;
    }

    return (
        <tr style={{display: isShow ? '' : 'none'}} className={className}>
            <td>{props.index + 1}</td>
            <td>{todoText}</td>
            <td>
                <button onClick={toggleClick} className="btn">
                    {completed ? '完成' : '待办'}
                </button>
            </td>
            <td>
                <button onClick={deleteClick} className="btn btn-danger">
                    删除
                </button>
            </td>
        </tr>
    );
};