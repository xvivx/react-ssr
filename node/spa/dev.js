import path from 'path';
import webpack from 'webpack';
import express from 'express';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import defineConfig from '../webpack/client.dev.config';
import dirs from '../config/index';
import { print } from '../utils/log';


var app = express();
var startTime = null;
var config = defineConfig({ type: 'spa' });
var compiler = webpack(config);
var compilerResolve
var compilerPromise = new Promise(r => compilerResolve = r);


compiler.hooks.compile.tap('dev', function () {
    startTime = new Date();
    print(`[${startTime.toLocaleTimeString()}] 开始执构建开发环境...`, 'yellow');
});

compiler.run((err, stats) => {
    if(stats.compilation.errors.length) {
        print('webpack运行失败，错误如下：');
        console.log(stats.compilation.errors);
    } else {
        var wait = new Date() - startTime;
        
        console.info(stats.toString(config.stats));
        print(`[${new Date().toLocaleTimeString()}] 构建成功 - ${wait}ms`, 'green');
        compilerResolve();
    }
});

app.use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
    logLevel: 'silent',
    wacthOptions: {
        ignored: /node_modules/,
    }
}));

app.use(webpackHotMiddleware(compiler));


process.on('unhandledRejection', (msg) => {
    console.log('错误信息: ', msg);
    process.exit(1);
});

async function start() {
    // 等待编译完成
    await compilerPromise;

    // 为了兼容browserhistory
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