import React from 'react';


export default class Home extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        return (
            <div>
                <h1>Home Page</h1>
                <div>
                    This is home page content ...
                </div>
            </div>
        );
    }
};