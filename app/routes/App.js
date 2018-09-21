import React from 'react';
import { renderRoutes } from 'react-router-config';

export default ({ route }) => {
    return (
        <div>
            <h1>项目导航。。。</h1>
            {
                renderRoutes(route.routes)
            }
        </div>
    );
};