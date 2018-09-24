import webpack from 'webpack';
import config from '../webpack/client.dev.config';
import express from 'express';
import dirs from '../config/index';


var compiler = webpack(config({type: 'spa'}));

compiler.run((err, stats) => {
    var app = express();
    console.log(stats.compilation.errors)
    // app.use(express.static(dirs.deploy + '/client'));

    // app.get('*', (req, res, next) => {
    //     res.sendFile(dirs.deploy + '/client/index.html');
    // });
    
    // app.listen(dirs.port, () => {
    //     console.log(`代码发布前请打开: http://localhost:${dirs.port} 检查下有无错误`);
    // });
})