import path from 'path';
import appConfig from '../../app.config';

var root = path.resolve('');
var defaultConfig = {
    root: root,
    client: path.resolve(root, 'app'),
    server: path.resolve(root, 'node/server'),
    deploy: path.resolve(root, 'deploy'),
    stats: path.resolve(root, 'deploy/stats/react-loadable.json'),
    public: path.resolve(root, 'node/public'),
    publicPath: '/',
    port: 3000,
};

export default Object.assign(Object.create(null), defaultConfig, appConfig);