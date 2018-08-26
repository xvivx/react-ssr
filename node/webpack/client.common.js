import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import dirs from '../configs/index';
import { env } from '../utils';

var isDev = env('development');

export default {
    mode: isDev ? 'development' : 'production',
    entry: {
        // 开发模式下启用热更新
        app: (isDev ? [`webpack-hot-middleware/client`] : []).concat(dirs.clientEntry),
        vendor: [
            'react',
            'react-dom',
            'react-router',
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
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(isDev ? 'development' : 'production')
        }),
    ],
    // optimization: {
    //     splitChunks: {
    //         chunks: 'all',
    //     },
    // },
    target: 'web',
};