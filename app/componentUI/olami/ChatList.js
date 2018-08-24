import React from 'react';

import ChatItem from './ChatItem';

export default props => {
    const { data } = props;
    return (
        <div className="chat-container">
        {
            data.map((item, index) => {
                return <ChatItem key={ index } { ...item } />
            })
        }
        </div>
    );
};