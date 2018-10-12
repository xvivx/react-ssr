import React from 'react';
import { renderRoutes } from 'react-router-config';

import NavBar from '../nav-bar/NavBar';
import navs from '../../consts/nav';
import styles from './root.less';

export default (props) => {
    var { route, history } = props;

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <NavBar data={navs}></NavBar>
            {
				renderRoutes(route.routes)
			}
            </div>
            <div className={styles.footer}>
                页面底部
            </div>
        </div>
    );
};