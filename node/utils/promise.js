import { print } from './log';

export var changeToPromise = function (compiler, config) {
    var color = config.name === 'client' ? 'green' : 'yellow';
    var lines = config.name === 'client' ? '='.repeat(50) : '-'.repeat(50);
    
    return new Promise((resolve, reject) => {
        var timeStart = null;

        compiler.hooks.compile.tap(config.name, () => {
            timeStart = new Date();
            print(`[${timeStart.toLocaleTimeString()}]: 开始编译 '${config.name}'...`, color);
        });

        compiler.hooks.done.tap(config.name, (stats) => {
            var endTime = new Date();
            var { errors, warnings } = stats.compilation || {};

            if(errors.length) {
                reject(errors[0]);
                return;
            }

            print(lines, 'white');
            print(stats.toString(config.stats), color);
            print(lines, 'white');
            print(`[${endTime.toLocaleTimeString()}]: 完成${config.name} ${endTime - timeStart}ms`, color);

            if(warnings.length) {
                warnings.forEach(console.warn);
            }

            resolve(stats);
        });
    });
};