import React from 'react';

import Time from './components/Time';
import bg from '../../assets/imgs/title.jpg'
import './style.less';

export default class Home extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        return (
            <div className="container">
                <h1>Home Page</h1>
                <div style={{textAlign: 'center'}}>
                    <img src={bg} alt=""/>
                </div>
                <Time></Time>
            </div>
        );
    }
};
