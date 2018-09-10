import path from 'path';
import webpack from 'webpack';
import express from 'express';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import moment from 'moment';
import { asynchronization } from './utils';
import config from '../webpack/client.dev';
import dirs from '../configs';


async function compile () {
    var app = express();
    var compiler = webpack(config);
    var hooks = (resolve, reject) => {
        var name = 'client';
        
        compiler.hooks.compile.tap(name, () => {
            console.info(`${moment().format('HH:mm:ss')}: 开始编译。。。`);
        });

        compiler.hooks.done.tap(name, (stats) => {
            var time = moment().format('HH:mm:ss');

            if(stats.hasErrors()) {
                console.info(`${time}: ${name}编译失败`);
                return reject(`Compilation failed!`);
            }

            console.info(stats.toString({
                colors: true,
                timings: true
            }));
            console.info(`${time}: ${name} 编译成功。`);
            resolve(stats);
        });
    };
    var clientPromise = asynchronization(hooks);
    var instance = webpackDevMiddleware(compiler, {
        publicPath: config.output.publicPath,
        logLevel: 'silent',
        logTime: true,
    });

    app.use(instance);
    // option的path最好不要指定，以免不小心覆盖前端路由
    app.use(webpackHotMiddleware(instance.context.compiler, {
        heartbeat: 2000,
        log: false
    }));

    await clientPromise;

    app.get('*', (req, res, next) => {
        var filename = path.join(config.output.path, 'index.html');

        compiler.outputFileSystem.readFile(filename, (err, result) => {
            if(err){
                return(next(err));
            }

            res.set('Content-Type', 'text/html');
            res.send(result);
            res.end();
        });
    });

    app.listen(dirs.port, function () {
        console.info(`服务器已经启动在: http://localhost:${dirs.port}`);
    });
};

compile();