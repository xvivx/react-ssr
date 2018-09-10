import React from 'react';

export default ({counter = 0}) => {
    const percent = Math.max(Math.min(counter / 100, 1) * 100, 0) .toFixed(0)+ '%';
    const activeClass = (counter < 0 || counter > 100) ? '' : 'active';

    return (
        <div className="container page-header">
            <div 
                className={ `progress progress-bar progress-bar-success progress-bar-striped ${ activeClass }` } 
                role="progressbar" 
                aria-valuemax="100"
                style={{ width: percent }}
            >
                <span>{ percent }</span>
            </div>
        </div>
    );
};