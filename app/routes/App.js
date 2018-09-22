import React from 'react';
import { NavLink } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';

export default ({ route }) => {
    return (
        <div>
            <ul>
                <NavLink to="/">首页</NavLink>
                <NavLink to="/todo">todo</NavLink>
            </ul>
            {
                renderRoutes(route.routes)
            }
        </div>
    );
};