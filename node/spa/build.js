import webpack from 'webpack';
import defineConfig from '../webpack/client.prd.config';
import express from 'express';


import dirs from '../config/index';
import { print } from '../utils/log';

var config = defineConfig({type: 'spa'});
var compiler = webpack(config);
var start = null;

compiler.hooks.compile.tap('build', function () {
    start = new Date();
    print(`[${start.toLocaleTimeString()}] 开始执行前端生产模式打包任务`, 'green');
});

compiler.run((err, stats) => {
    if(stats.compilation.errors.length) {
        print('spa生产模式打包失败');
        console.log(stats.compilation.errors);
    } else {
        var wait = new Date() - start;
        
        console.info(stats.toString(config.stats));
        print(`[${new Date().toLocaleTimeString()}] 打包完成 - ${wait}ms`, 'green');
        
        var app = express();

        print('启动临时服务器检查项目。。。。');
        app.use(express.static(dirs.deploy + '/client'));

        app.get('*', (req, res, next) => {
            res.sendFile(dirs.deploy + '/client/index.html');
        });
        
        app.listen(dirs.port, () => {
            console.log(`代码发布前请打开: http://localhost:${dirs.port} 检查下有无错误`);
        });
    }
});