import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter, matchPath } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import express from 'express';
import routes from '../../app/routes/app.routes';

var app = express();

app.get('*', (req, res) => {
    // var route = routes.find(r => matchPath(req.url, routes)) || {};
    var context = {};
    var html = ReactDOMServer.renderToString(
        <StaticRouter
            location={req.url}
            context={context}
        >
        {
            renderRoutes(routes)
        }
        </StaticRouter>
    );

    res.send(`<!doctype html>${html}`);
});

app.listen(3000)