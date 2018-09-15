
export var env = function (name) {
    if(process.argv.slice(2).filter(item => item.indexOf(name) !== -1).length) {
        env = () => true;
        return true;
    } else {
        env = () => false;
        return false;
    }
};

export var asynchronization = (fn) => {
    return new Promise((resolve, reject) => {
        fn(resolve, reject);
    }).catch(err => {
        throw new Error(err && err.message || '语法错误');
    });
};
