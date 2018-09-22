import { print } from './log';

export var changeToPromise = function (compiler, config) {
    var color = config.name === 'client' ? 'green' : 'yellow';
    var lines = config.name === 'client' ? '='.repeat(50) : '-'.repeat(50);
    
    return new Promise((resolve, reject) => {
        var timeStart = new Date();
        compiler.hooks.compile.tap(config.name, () => {
            var time = timeStart.toLocaleTimeString();
            print(`[${time}]: 开始编译 '${config.name}'...`, color);
        });
        compiler.hooks.done.tap(config.name, (stats) => {
            var time = timeStart.toLocaleTimeString();
            var { errors, warnings } = stats.compilation || {};

            print(`[${time}]: 完成${config.name} ${Date.now() - timeStart}ms`, color);
            timeStart = new Date();

            if(errors.length) {
                reject(errors);
                return;
            }

            print(lines, 'white');
            print(stats.toString(config.stats), color);
            print(lines, 'white');

            if(warnings.length) {
                warnings.forEach(console.warn);
            }

            resolve(stats);
        });
    });
};