import React from 'react';
import { hydrate, render } from 'react-dom';
import { renderRoutes } from 'react-router-config';
import { BrowserRouter } from 'react-router-dom';
import routes from './routes/app.routes';

var container = document.getElementById('root');
var hotRender = () => {
    hydrate(
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
} catch(err) {
    if(process.env.NODE_ENV === 'development') {
        throw new Error(err);
    }
}

hotRender();