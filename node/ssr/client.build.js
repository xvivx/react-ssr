import webpack from 'webpack';
import defineConfig from '../webpack/client.prd.config';


import { print } from '../utils/log';

var config = defineConfig({type: 'ssr'});
var compiler = webpack(config);
var start = null;

compiler.hooks.compile.tap('build', function () {
    start = new Date();
    print(`[${start.toLocaleTimeString()}] 开始执行同构前端生产模式打包任务`, 'green');
});

compiler.run((err, stats) => {
    if(stats.compilation.errors.length) {
        print('同构生产模式打包失败');
        console.log(stats.compilation.errors);
    } else {
        var wait = new Date() - start;
        
        console.info(stats.toString(config.stats));
        print(`[${new Date().toLocaleTimeString()}] 同构前端部分打包完成 - ${wait}ms`, 'green');
    }
});