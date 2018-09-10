import path from 'path';

var root = path.resolve('');

export default {
    root,
    clientEntry: path.resolve(root, 'app/index.js'),
    clientOutput: path.resolve(root, 'build'),
    publicPath: '/',
    port: process.env.port || 5000
};