import React from 'react';
import { NavLink } from 'react-router-dom';

import styles from './style.less';

import logo from '../../assets/imgs/logo.png';



export default class NavBar extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            collapse: false
        };
    }
    handleToggleNavPanel = () => {
        this.setState({
            collapse: !this.state.collapse
        });
    }
    render() {
        const data = this.props.data;
        var { collapse } = this.state;
        return (
            <div className={`${styles.wrapper} ${collapse ? styles.collapse : ''}`}>
                <div className={styles.tools}>
                    <div className={styles.logo} style={{backgroundImage: `url(${logo})`}}>
                    </div>
                    <h2>123</h2>
                    <div className={`${styles.icon} ${collapse ? styles.collapse : ''}`} onClick={this.handleToggleNavPanel}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
                <nav className={`${styles.navs} ${collapse ? styles.collapse : ''}`}>
                    <li>1</li>
                    <li>2</li>
                    <li>3</li>
                </nav>
            </div>
        );
    }
}