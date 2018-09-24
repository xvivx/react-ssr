import webpack from 'webpack';

import defineClientConfig from '../webpack/client.prd.config';
import serverConfig from '../webpack/server.config';
import { print } from '../utils/log';


var clientConfig = defineClientConfig({ type: 'ssr' });
var multiCompiler = webpack([clientConfig, serverConfig]);
var [clientCompiler, serverCompiler] = multiCompiler.compilers;
var clientStartTime = null;
var serverStartTime = null;

// client打包任务配置
clientCompiler.hooks.compile.tap(clientConfig.name, function () {
    clientStartTime = new Date();
    print(`[${clientStartTime.toLocaleTimeString()}] 开始执行${clientConfig.name}任务`, 'green');
});

clientCompiler.run((err, stats) => {
    if (err) {
        throw new Error(err);
    }

    var endTime = new Date();

    if (stats.compilation.errors.length) {
        console.log(stats.compilation.errors);
        print(`[${endTime.toLocaleTimeString()}] ${clientConfig.name}任务失败`, 'red');
    } else {
        var wait = endTime - clientStartTime;

        console.info(stats.toString(clientConfig.stats));
        print(`[${endTime.toLocaleTimeString()}] ${clientConfig.name}完成 -${wait}ms`, 'green');
    }
});

// server打包配置
serverCompiler.hooks.compile.tap(serverConfig.name, function () {
    serverStartTime = new Date();
    print(`[${serverStartTime.toLocaleTimeString()}] 开始执行${serverConfig.name}任务`, 'green');
});

serverCompiler.run((err, stats) => {
    if (err) {
        throw new Error(err);
    }

    var endTime = new Date();

    if (stats.compilation.errors.length) {
        console.log(stats.compilation.errors);
        print(`[${endTime.toLocaleTimeString()}] ${serverConfig.name}任务失败`, 'red');
    } else {
        var wait = endTime - serverStartTime;

        console.info(stats.toString(serverConfig.stats));
        print(`[${endTime.toLocaleTimeString()}] ${serverConfig.name}完成 -${wait}ms`, 'green');
    }
});