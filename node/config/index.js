import path from 'path';

var root = path.resolve('');

export default {
    root: root,
    client: path.resolve(root, 'app'),
    server: path.resolve(root, 'node/server'),
    deploy: path.resolve(root, 'deploy'),
    publicPath: '/',
    port: 3000
};