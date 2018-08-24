import React from 'react';

import '../css/chat.less';
import systemTitle from '../../styles/img/bg_pic1.jpg';
import clientTitle from '../../styles/img/title.jpeg';


export default props => {
    const { contentText, titleImg, className } = props;
    
    return (
        <div className={`item-row clearfix ${ className }`}>
            <div 
                className="title-container" 
                style={{ backgroundImage: `url(${ className === 'right' ? clientTitle : systemTitle })` }} 
            />
            <div className="content-text">
                <p className="text">{ contentText }</p>
            </div>
        </div>
    );
}