import React from 'react';

import olamiHOC from '../container/olami/olamiHOC';
import ChatList from '../componentUI/olami/ChatList';
import ChatInput from '../componentUI/todo/AddTodo';
import '../styles/css/olami.less';

class ChatApp extends React.Component {

    componentDidUpdate() {
        window.scrollTo(0, 100000000);
    }

    render() {
        const { dispatchAddTodo, data } = this.props;
        return (
            <div className="container chat-app">
                <ChatList data={ data } />
                <ChatInput 
                    dispatchAddTodo={ dispatchAddTodo } 
                    className="olami" 
                    placeholder={ '请输入您的消息，不能为空' } 
                    btnName="发送"
                    btnClass="btn-success"
                />
            </div>
        );
    }
}


export default olamiHOC(ChatApp);