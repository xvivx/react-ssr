export var asynchronization = (fn) => {
    return new Promise((resolve, reject) => {
        fn(resolve, reject);
    }).catch(err => {
        throw new Error(err && err.message || '语法错误');
    });
};
