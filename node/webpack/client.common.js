import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import dirs from '../configs/index';

var isDev = process.env.NDOE_ENV === 'development';

export default {
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
        filename: `js/[name].js`,
        chunkFilename: 'js/chunks/[chunkhash].js',
        pathinfo: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Hello Webpack',
            template: path.resolve(dirs.clientEntry, '../index.html'),
            filename: 'index.html'
        }),
    ],
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    chunks: 'all',
                    test: /[\\/]node_modules[\\/]/,
                    name: true,
                },
            },
        },
    },
    target: 'web',
};