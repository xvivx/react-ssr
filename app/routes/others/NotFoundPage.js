import React from 'react';


export default class Home extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        return (
            <div>
                <h1>404</h1>
                <div>
                    页面未找到
                </div>
            </div>
        );
    }
};