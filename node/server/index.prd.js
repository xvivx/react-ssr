import fs from 'fs';
import express from 'express';
import React from 'react';
import Loadable from 'react-loadable';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { renderRoutes, matchRoutes } from 'react-router-config';
import { getBundles } from 'react-loadable/webpack'

import routes from '../../app/routes/app.routes';
import dirs from '../config/index';
import { print } from '../utils/log';

var app = express();
var indexHtml = fs.readFileSync(dirs.deploy + '/client/index.html').toString();
var statsJson = fs.readFileSync(dirs.stats).toString();
var stats = JSON.parse(statsJson);

async function ssrRender(req, res, next) {
    try {
        var modules = [];
        var context = {};
        var ssrHtml = ReactDOMServer.renderToString(
            <Loadable.Capture report={moduleName => modules.push(moduleName)}>
                <StaticRouter
                    location={req.url}
                    context={context}
                >
                {
                    renderRoutes(routes)
                }
                </StaticRouter>
            </Loadable.Capture>
        );

        var currentRoutes = matchRoutes(routes, req.url);
        var bundles = getBundles(stats, modules) || [];
        var styles = bundles.filter(bundle => bundle.file.endsWith('.css')).map(style => {
            return `<link href="${dirs.publicPath}${style.file}" rel="stylesheet"/>`;
        }).join('\n');
        var scripts = bundles.filter(bundle => bundle.file.endsWith('.js')).map(script => {
            return `<script src="${dirs.publicPath}${script.file}"></script>`;
        }).join('\n') + '<script>window.PREALOAD_DONE && window.PREALOAD_DONE()</script>';

        res.send(
            indexHtml.
            replace('</head>', `${styles}</head>`).
            replace('<div id="root"></div>', `<div id="root">${ssrHtml}</div>`).
            replace('</body>', `${scripts}</body>`)
        );
    } catch (err) {
        next(err);
    }
}

async function start() {
    app.use(function (req, res, next) {
        console.log(req.method, '-->', req.path);
        next();
    });
    app.get('^/$', ssrRender);
    app.use(express.static(dirs.deploy + '/client'));
    app.get('/*', ssrRender);

    app.use((req, res, next) => {
        res.status(404);
        res.render('404');
    });
    
    app.use((err, req, res, next) => {
        res.status(err.status || 500);
    
        console.info(err.stack);
        res.send(`服务端错误，请联系开发报告一个bug`);
    });

    await Loadable.preloadAll();

    app.listen(dirs.port, () => {
        print(`服务已经运行在http://localhost:${dirs.port}`);
    });
}

start();

export default app;

