// 服务端框架和所用文件
import path from 'path';
import webpack from 'webpack';
import express from 'express';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import dirs from '../config/index';
import config from '../webpack/client.dev.config';

// 前端框架和前端代码
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import routes from '../../app/routes/app.routes';


var app = express();
var compiler = webpack(config);
var indexHtml = '';
var compilerResolve = null;
var compilerPromise = new Promise((resolve) => {
    compilerResolve = resolve;
});

compiler.hooks.compile.tap('ClientCompile', () => {
    console.log(new Date().toLocaleTimeString() + '开始编译。。。');
});

compiler.hooks.done.tap('ClientCompile', (stats) => {
    compilerResolve(stats);
});

async function ssrRender (req, res, next) {
    var filename = path.join(config.output.path, 'index.html');

    if(!indexHtml) {
        await new Promise((resolve) => {
            compiler.outputFileSystem.readFile(filename, (err, result) => {
                if (err) {
                    // 这里err必须存在，否则进入404页面
                    return next(err);
                }
                
                indexHtml = result.toString('utf8');
                resolve(indexHtml);
            });
        });
    }
    
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

    res.set('Content-Type', 'text/html');
    res.send(indexHtml.replace('<div id="root"></div>', `<div id="root">${html}</div>`));
    res.end();
}


process.on('unhandledRejection', (msg) => {
    console.log('错误信息: ', msg);
    process.exit(1);
});

async function start() {
    app.use('^/$', ssrRender);
    app.use(webpackDevMiddleware(compiler, {
        publicPath: '/',
        logTime: true,
        wacthOptions: {
            ignored: /node_modules/,
        }
    }));

    app.use(webpackHotMiddleware(compiler));

    // 等待编译完成
    await compilerPromise;

    // 这个要放在最后面
    app.get('*', ssrRender);

    // 404页面，一般不会发生，404在前端就做了
    app.use((req, res) => {
        res.status(404);
        res.send(`请求${req.url}时未找到相应资源`);
    });

    // 服务器错误页面
    app.use((err, req, res) => {
        res.status(500);
        res.send(`请求${req.url}时发生服务器错误\n${err.stack}`);
    });

    app.listen(dirs.port, function () {
        console.info(`服务器已经启动在: http://localhost:${dirs.port}`);
    });
}


start();