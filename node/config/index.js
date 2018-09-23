
import path from 'path';

var root = path.resolve('');

export default {
    root: root,
    client: path.resolve(root, 'app'),
    server: path.resolve(root, 'node/server'),
    deploy: path.resolve(root, 'deploy'),
    stats: path.resolve(root, 'deploy/stats/react-loadable.json'),
    publicPath: '/',
    port: 3000,
};