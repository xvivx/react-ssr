import React from 'react';


export default class Todo extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            task: [
                '学习http',
                '深入学习node，方向：高性能server',
                '深入webpack，方向：高性能打包，理解背后原理',
                'redux相关技术，方向：阅读源码，深入理解设计思想，抽象设计模式'
            ]
        };
    }

    handleClick() {
        console.log('-------');
    }

    render() {
        return (
            <div>
                <h1 onClick={this.handleClick}>Todo Page</h1>
                <div>
                    <ul>
                    {
                        this.state.task.map((task, key) => (
                            <li key={key}>{task}</li>
                        ))
                    }
                    </ul>
                </div>
            </div>
        );
    }
};