import path from 'path';
import express from 'express';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import defineClientConfig from '../webpack/client.dev.config';
import serverConfig from '../webpack/server.config';
import dirs from '../config/index';
import { print } from '../utils/log';
import { changeToPromise } from '../utils/promise';


serverConfig.output.hotUpdateMainFilename = 'updates/[hash].hot-update.json';
serverConfig.output.hotUpdateChunkFilename = 'updates/[id].[hash].hot-update.js';

var server = express();
var app;
var appPromise;
var appPromiseResolve;
var appPromiseIsResolved = true;
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


clientCompiler.hooks.compilation.tap('html', (compilation) => {
    compilation.hooks.
    htmlWebpackPluginAfterHtmlProcessing.
    tapAsync('html', (data, cb) => {
        global.INDEX_HTML = data.html;
        cb(null, data);
    });
});


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



server.use((req, res) => {
    appPromise.
    then(() => app.handle(req, res)).
    catch(error => console.error(error));
    return;
});



async function start() {
    try {
        await Promise.all([clientPromise, serverPromise]);

        app = require('../../deploy/server/server').default;

        appPromiseIsResolved = true;
        appPromiseResolve();

        var filename = path.resolve(clientConfig.output.path, 'index.html');

        global.INDEX_HTML = clientCompiler.outputFileSystem.readFileSync(filename).toString();

        server.listen(dirs.port, () => {
            print(`服务已经启动在: http://localhost:${dirs.port}`);
        });
    } catch (err) {
        console.error(err.stack);
        process.exit(1);
    }

    return server;
}


function checkForUpdate(fromUpdate) {
    var hmrPrefix = '[\x1b[35mHMR\x1b[0m] ';

    if (!app.hot) {
        throw new Error(`${hmrPrefix}热更新已被禁用，请在开发模式下开启热更新，了解更多请前去webpack官方文档查看`);
    }

    if (app.hot.status() !== 'idle') {
        return Promise.resolve();
    }

    return (
        app.
        hot.
        check(true).
        then(updatedModules => {
            if (!updatedModules) {
                if (fromUpdate) {
                    console.warn(`${hmrPrefix}已经更新服务端代码`);
                }
                return;
            }
            if (updatedModules.length === 0) {
                console.warn(`${hmrPrefix}没有需要更新的内容`);
            } else {
                console.warn(`${hmrPrefix}发生更新的模块:`);
                updatedModules.forEach(moduleId =>
                    console.warn(`${hmrPrefix} - ${moduleId}`),
                );
                checkForUpdate(true);
            }
        }).
        catch(error => {
            // 其实这里是出现了错误，现在了解到的是webpack编译出错会进这里
            if (['abort', 'fail'].includes(app.hot.status())) {
                console.warn(`${hmrPrefix}无法应用热更新`);
                // 删除缓存，重新拉取app
                delete require.cache[require.resolve('../../deploy/server/server.js')];
                app = require('../../deploy/server/server.js').default;
                console.warn(`${hmrPrefix}服务端代码重新加载.`);
            } else {
                console.warn(`${hmrPrefix}本次更新: ${error.stack || error.message}`);
            }
        })
    );
}


export default start();