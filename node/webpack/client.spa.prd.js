import webpack from 'webpack';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import dirs from '../config/index';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';

var isDev = false;

export default {
    mode: isDev ? 'development' : 'production',
    entry: {
        // 开发模式下启用热更新
        app: (isDev ? [`webpack-hot-middleware/client`] : []).concat(dirs.client + '/index.js')
    },
    output: {
        path: dirs.deploy,
        publicPath: dirs.publicPath,
        filename: `${isDev ? '[name]' : 'js/[name].[chunkhash:8]'}.js`,
        chunkFilename: `${isDev ? '[name].chunk' : 'js/chunks/[name].[chunkhash:8]'}.js`,
    },
    target: 'web',
    module: {
        strictExportPresence: true,
        rules: [
            {
                test: /jsx?$/,
                exclude: /(node_modules|bower_components)/,
                sideEffects: false,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            babelrc: false,
                            presets: [
                                ['@babel/preset-react', {
                                    useBuiltIns: true,
                                }]
                            ],
                            plugins: [
                                ['syntax-dynamic-import'],
                            ]
                        }
                    }
                ]
            }
        ]
    },
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
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Hello Webpack',
            template: path.resolve(dirs.client, 'index.html'),
            filename: 'index.html'
        }),
        new CleanWebpackPlugin([dirs.deploy], {
            root: dirs.root,
        }),
        new webpack.HashedModuleIdsPlugin({
            hashFunction: 'sha256',
            hashDigest: 'hex',
            hashDigestLength: 20
        }),
       
    ],
};