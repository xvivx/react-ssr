import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import dirs from '../configs/index';
import { env } from '../utils';

var isDev = env('development');

export default {
    mode: isDev ? 'development' : 'production',
    entry: {
        // 开发模式下启用热更新
        app: (isDev ? [`webpack-hot-middleware/client`] : []).concat(dirs.clientEntry),
        vendors: [
            'react',
            'react-dom',
            'react-router',
            'react-router-dom',
            'redux',
            'redux-thunk',
            'react-redux'
        ]
    },
    output: {
        path: dirs.clientOutput,
        publicPath: dirs.publicPath,
        filename: `${isDev ? '[name]' : 'js/[name].[chunkhash:8]'}.js`,
        chunkFilename: `${isDev ? '[name].chunk' : 'js/chunks/[name].[chunkhash:8]'}.js`,
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Hello Webpack',
            template: path.resolve(dirs.clientEntry, '../index.html'),
            filename: 'index.html'
        }),
    ],
    optimization: {
        runtimeChunk: 'single',
        splitChunks: {
            chunks: 'all',
            cacheGroups: {
                node_modules: {
                    chunks: 'all',
                    test: /[\\/]node_modules[\\/]/,
                    name: true,
                },
            },
        },
    },
    target: 'web',
};