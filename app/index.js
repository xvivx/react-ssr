import React from 'react';
import Loadable from 'react-loadable';
import { hydrate, render } from 'react-dom';
import { renderRoutes } from 'react-router-config';
import { BrowserRouter } from 'react-router-dom';
import routes from './routes/app.routes';


var container = document.getElementById('root');
var renderMthod = process.env.RENDER_TYPE === 'spa' ? render : hydrate;


var hotRender = () => {
    renderMthod(
        <BrowserRouter>
            {
                renderRoutes(routes)
            }
        </BrowserRouter>,
        container
    );
};


try {
    module.hot.accept('./routes/app.routes', () => {
        hotRender();
    });
} catch (err) {
    if (process.env.NODE_ENV === 'development') {
        throw new Error(err);
    }
}


if(process.env.RENDER_TYPE !== 'spa') {
    window.PREALOAD_DONE = () => {
        Loadable.preloadReady().then(() => {
            hotRender();
        });
    };
} else {
    hotRender();
}

