import React from 'react';
import {SHOW_ALL, SHOW_ACTIVE, SHOW_DONE} from '../../redux/actions/todoActions';

export default (props, context) => {
    const {dispatchFilter, todos} = props;
    const sucessNum = todos.filter(item => item.completed).length;
    const totalNum = todos.length || 1;
    const sucPercent = (sucessNum / totalNum * 100).toFixed(2) + '%';
    const failPercent = ((1 - sucessNum / totalNum) * 100).toFixed(2) + '%';
    return (
        <div>
            <div className="btn-group page-header" role="group">
                <button type="button" className="btn btn-info" onClick={e => dispatchFilter(SHOW_ALL)}>
                    全部<span className="badge">{todos.length}</span>
                </button>
                <button type="button" className="btn btn-success" onClick={e => dispatchFilter(SHOW_DONE)}>
                    已完成<span className="badge">{sucessNum}</span>
                </button>
                <button type="button" className="btn btn-warning" onClick={e => dispatchFilter(SHOW_ACTIVE)}>
                    未完成<span className="badge">{todos.length - sucessNum}</span>
                </button>
            </div>
            {
                todos.length > 0 &&
                <div className="progress">
                    <div 
                        className="progress-bar progress-bar-success progress-bar-striped" 
                        role="progressbar" 
                        aria-valuenow="40" 
                        aria-valuemin="0" 
                        aria-valuemax="100"
                        style={{width: sucPercent}}
                    >
                        <span>{sucPercent}完成</span>
                    </div>
                    <div 
                        className="progress-bar progress-bar-warning progress-bar-striped" 
                        role="progressbar" aria-valuenow="60" 
                        aria-valuemin="0" aria-valuemax="100" 
                        style={{width: failPercent}}
                    >
                        <span>{failPercent}未完成</span>
                    </div>
                </div>
            }
        </div>
    );
};
