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


var app = express();

async function ssrRender(req, res, next) {
    try {
        var modules = [];
        var str = fs.readFileSync(dirs.stats).toString();
        var stats = JSON.parse(str);

        await Loadable.preloadAll();

        var context = {};
        var ssr = ReactDOMServer.renderToString(
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
            global.INDEX_HTML.
                replace('</head>', `${styles}</head>`).
                replace('<div id="root"></div>', `<div id="root">${ssr}</div>`).
                replace('</body>', `${scripts}</body>`)
        );
    } catch (err) {
        next(err);
    }
}

app.get('^/$', ssrRender);
app.use(global.CLIENT_INS);
app.get('/*', ssrRender);

app.use((req, res, next) => {
    res.status(404);
    res.render('404');
});

app.use((err, req, res, next) => {
    res.status(err.status || 500);

    console.info(err.stack);
    res.send(`${err.stack.replace(/at/g, '<br />at')}`);
});


if (module.hot) {
    app.hot = module.hot;
    module.hot.accept('../../app/routes/app.routes');
}


export default app;

