import webpack from 'webpack';
import moment from 'moment';
import config from '../webpack/dll.config';

var compiler = webpack(config);


compiler.hooks.compile.tap('Begin', () => {
    console.info(`${moment().format('HH:mm:ss')}: 开始打包dll`);
});

compiler.hooks.done.tap('Done', (stats) => {
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
});

compiler.run(() => {
    console.info(`${moment().format('HH:mm:ss')}: 打包完成。`);
});