import path from 'path';
import webpack from 'webpack';
import express from 'express';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import config from '../webpack/client.dev';
import dirs from '../configs';


var app = express();
var compiler = webpack(config);

app.use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
}));

// option的path最好不要指定，以免不小心覆盖前端路由
app.use(webpackHotMiddleware(compiler, {
    heartbeat: 2000
}));

app.get("*", (req, res, next) =>{
    var filename = path.join(config.output.path, 'index.html');

    compiler.outputFileSystem.readFile(filename, (err, result) =>{
        if(err){
            return(next(err))
        }

        res.set('Content-Type', 'text/html');
        res.send(result);
        res.end();
    });
});



app.listen(dirs.port, function () {
    console.info(`服务器已经启动在: http://localhost:${dirs.port}`);
    console.log('请等待webpack编译。。。');
});
