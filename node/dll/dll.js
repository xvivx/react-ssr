import webpack from 'webpack';
import config from '../webpack/client.dll.config';
import { print } from '../utils/log';

var compiler = webpack(config);
var start = null;

compiler.hooks.compile.tap('dll', function () {
    start = new Date();
    print(`[${start.toLocaleTimeString()}] 开始执行dll任务`, 'green');
});

compiler.run((err, stats) => {
    if(stats.compilation.errors.length) {
        print('dll打包失败');
        console.log(stats.compilation.errors);
    } else {
        var wait = new Date() - start;

        console.info(stats.toString(config.stats));
        print(`[${new Date().toLocaleTimeString()}] dll打包完成 -${wait}ms`, 'green');
    }
});