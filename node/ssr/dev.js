import path from 'path';
import express from 'express';
import webpack from 'webpack';
import helmet from 'helmet';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackHotServerMiddleware from 'webpack-hot-server-middleware';

import defineClientConfig from '../webpack/client.dev.config';
import serverConfig from '../webpack/server.dev.config';
import dirs from '../config/index';
import { print } from '../utils/log';
import { changeToPromise } from '../utils/promise';


var app = express();
var clientConfig = defineClientConfig({ type: 'ssr' });
var multiCompiler = webpack([clientConfig, serverConfig]);
var [clientCompiler, serverCompiler] = multiCompiler.compilers;
var clientPromise = changeToPromise(clientCompiler, clientConfig);
var serverPromise = changeToPromise(serverCompiler, serverConfig);

app.use(helmet());
app.set('view engine', 'ejs');
app.use(webpackDevMiddleware(multiCompiler, {
    publicPath: dirs.publicPath,
}));

app.use(webpackHotMiddleware(clientCompiler));
app.use(webpackHotServerMiddleware(multiCompiler, {
    serverRendererOptions: { outputPath: serverConfig.output.path }
}));

app.set('views', path.join(__dirname, '../../public/views'));

async function start() {
    await Promise.all([
        clientPromise,
        serverPromise
    ]);

    app.listen(dirs.port, () => {
        print(`服务已经启动在: http://localhost:${dirs.port}`);
    });
}

process.on('unhandledRejection', (msg) => {
    console.log('错误信息: ', msg);
    process.exit(1);
});

start();