import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter, matchPath } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import Helmet from 'react-helmet';
import { flushChunkNames } from 'react-universal-component/server';
import routes from '../../app/routes/app.routes';
import flushChunks from 'webpack-flush-chunks';



export default ({ clientStats }) => async (req, res, next) => {
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

    var chunkNames = flushChunkNames();
    var { js, styles } = flushChunks(clientStats, { chunkNames });

    console.log(chunkNames)
    res.render('index', {
        title: '<title>ssr</title>',
        appString: html,
        js,
        styles
    });
}