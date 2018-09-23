import path from 'path';
import express from 'express';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import defineClientConfig from '../webpack/client.dev.config';
import serverConfig from '../webpack/server.dev.config';
import dirs from '../config/index';
import { print } from '../utils/log';
import { changeToPromise } from '../utils/promise';


serverConfig.output.hotUpdateMainFilename = 'updates/[hash].hot-update.json';
serverConfig.output.hotUpdateChunkFilename = 'updates/[id].[hash].hot-update.js';

var server = express();
var clientConfig = defineClientConfig({ type: 'ssr' });
var multiCompiler = webpack([clientConfig, serverConfig]);
var [clientCompiler, serverCompiler] = multiCompiler.compilers;
var clientPromise = changeToPromise(clientCompiler, clientConfig);
var serverPromise = changeToPromise(serverCompiler, serverConfig);


server.use(webpackDevMiddleware(clientCompiler, {
    publicPath: dirs.publicPath,
    logLevel: 'silent',
}));

server.use(webpackHotMiddleware(clientCompiler, { log: false }));


let appPromise;
let appPromiseResolve;
let appPromiseIsResolved = true;


serverCompiler.hooks.compile.tap(serverConfig.name, () => {
    if (!appPromiseIsResolved) return;
    
    appPromiseIsResolved = false;
    appPromise = new Promise(resolve => (appPromiseResolve = resolve));
});


serverCompiler.watch({ ignored: /node_modules/ }, (error, stats) => {
    if (app && !error && !stats.hasErrors()) {
        checkForUpdate().then(() => {
            appPromiseIsResolved = true;
            appPromiseResolve();
        });
    }
});


let app;

server.use((req, res) => {
    appPromise
        .then(() => app.handle(req, res))
        .catch(error => console.error(error));
});



async function start() {
    await clientPromise;
    await serverPromise;

    app = require('../../deploy/server/server').default;

    appPromiseIsResolved = true;
    appPromiseResolve();

    var filename = path.resolve(clientConfig.output.path, 'index.html');

    global.INDEX_HTML = clientCompiler.outputFileSystem.readFileSync(filename).toString();

    server.listen(dirs.port, () => {
        print(`服务已经启动在: http://localhost:${dirs.port}`);
    });
}

process.on('unhandledRejection', (msg) => {
    console.log('错误信息: ', msg);
    process.exit(1);
});

start();


function checkForUpdate(fromUpdate) {
    const hmrPrefix = '[\x1b[35mHMR\x1b[0m] ';
    if (!app.hot) {
        throw new Error(`${hmrPrefix}Hot Module Replacement is disabled.`);
    }
    if (app.hot.status() !== 'idle') {
        return Promise.resolve();
    }
    return app.hot
        .check(true)
        .then(updatedModules => {
            if (!updatedModules) {
                if (fromUpdate) {
                    console.info(`${hmrPrefix}Update applied.`);
                }
                return;
            }
            if (updatedModules.length === 0) {
                console.info(`${hmrPrefix}Nothing hot updated.`);
            } else {
                console.info(`${hmrPrefix}Updated modules:`);
                updatedModules.forEach(moduleId =>
                    console.info(`${hmrPrefix} - ${moduleId}`),
                );
                checkForUpdate(true);
            }
        })
        .catch(error => {
            if (['abort', 'fail'].includes(app.hot.status())) {
                console.warn(`${hmrPrefix}Cannot apply update.`);

                delete require.cache[require.resolve('../../deploy/server/server.js')];

                app = require('../../deploy/server/server.js').default;
                console.warn(`${hmrPrefix}App has been reloaded.`);
            } else {
                console.warn(
                    `${hmrPrefix}Update failed: ${error.stack || error.message}`,
                );
            }
        });
}