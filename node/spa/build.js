import webpack from 'webpack';
import express from 'express';
import prod from '../webpack/client.prd';
import dirs from '../configs/index';

var compiler = webpack(prod);

compiler.run((err, stats) => {
    if(err) {
        console.log(err.stack);
        return;
    }
    
    var app = express();

    app.use(express.static(dirs.clientOutput));

    app.get('*', (req, res, next) => {
        res.sendFile(dirs.clientOutput + '/index.html');
    });
    
    app.listen(dirs.port, () => {
        console.log(`代码发布前请打开: http://localhost:${dirs.port} 检查下有无错误`);
    });
});