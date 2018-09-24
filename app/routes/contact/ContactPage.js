import React from 'react';

import './contact.css';

export default class Home extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        return (
            <div>
                <h1 className="container">联系我们</h1>
                <div>
                    请联系我们
                </div>
            </div>
        );
    }
};