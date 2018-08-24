import path from 'path';
import webpack from 'webpack';
import express from 'express';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import config from '../webpack/client.config';


var app = express();
config.entry.unshift('webpack-hot-middleware/client?path=/www');

var compiler = webpack(config);

app.use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
    stats: {
        colors: true,
        progress: true
    },
}));

app.use(webpackHotMiddleware(compiler, {
    path: '/www',
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



app.listen(3000, function () {
    console.log('---------');
});
