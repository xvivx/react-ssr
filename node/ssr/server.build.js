import webpack from 'webpack';
import config from '../webpack/server.config';


import { print } from '../utils/log';

var compiler = webpack(config);
var start = null;

compiler.hooks.compile.tap('build', function () {
    start = new Date();
    print(`[${start.toLocaleTimeString()}] 开始执行同构服务端生产模式打包任务`, 'green');
});

compiler.run((err, stats) => {
    if(stats.compilation.errors.length) {
        print('同构服务端生产模式打包失败');
        console.error(stats.compilation.errors);
    } else {
        var wait = new Date() - start;
        
        console.info(stats.toString(config.stats));
        print(`[${new Date().toLocaleTimeString()}] 打包完成 - ${wait}ms`, 'green');
    }
});