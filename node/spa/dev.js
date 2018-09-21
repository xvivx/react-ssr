import path from 'path';
import webpack from 'webpack';
import express from 'express';
import config from '../webpack/client.dev.config';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import dirs from '../config/index';


var app = express();
var compiler = webpack(config);
var compilerPromise = new Promise((resolve) => {
    compiler.hooks.done.tap('client-complete', (stats) => {
        resolve(stats);
    });
});


process.on('unhandledRejection', (msg) => {
    console.log('错误信息: ', msg);
    process.exit(1);
});

async function start() {
    app.use(webpackDevMiddleware(compiler, {
        publicPath: '/',
        logTime: true,
    }));

    app.use(webpackHotMiddleware(compiler));

    // 等待编译完成
    await compilerPromise;

    // 这个要放在最后面
    app.get('*', (req, res, next) => {
        var filename = path.join(config.output.path, 'index.html');

        compiler.outputFileSystem.readFile(filename, (err, result) => {
            if(err) {
                // 这里err必须存在，否则进入404页面
                return next(err);
            }

            res.set('Content-Type', 'text/html');
            res.send(result);
            res.end();
        });
    });

    app.use((req, res) => {
        res.status(404);
        res.send(`请求${req.url}时未找到相应资源`);
    });
    
    app.use((err, req, res) => {
        res.status(500);
        res.send(`请求${req.url}时发生服务器错误\n${err.stack}`);
    });

    app.listen(dirs.port, function () {
        console.info(`服务器已经启动在: http://localhost:${dirs.port}`);
    });
}


start();