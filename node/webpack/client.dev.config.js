import path from 'path';
import dirs from '../config/index';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import {ReactLoadablePlugin} from 'react-loadable/webpack';

export default (options) => {
    return {
        name: 'client',
        entry: {
            client: [
                'webpack-hot-middleware/client',
                path.resolve(dirs.client, 'index.js')
            ]
        },
        output: {
            path: path.resolve(dirs.deploy, 'client'),
            filename: '[name].js',
            chunkFilename: 'chunks/[name].js',
            publicPath: dirs.publicPath
        },
        target: 'web',
        mode: 'development',
        devtool: 'cheap-module-eval-source-map',
        module: {
            rules: [
                {
                    test: /\.jsx?$/,
                    exclude: /(node_modules)/,
                    use: [
                        {
                            loader: 'babel-loader',
                            options: {
                                babelrc: false,
                                cacheDirectory: true,
                                presets: [
                                    '@babel/preset-react'
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
        plugins: [
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify('development'),
                'process.env.RENDER_TYPE': JSON.stringify(options.type || 'spa')
            }),
            new HtmlWebpackPlugin({
                title: 'Hello Webpack',
                template: path.resolve(dirs.client, 'public/index.html'),
                filename: 'index.html'
            }),
            new webpack.HotModuleReplacementPlugin(),
            new ReactLoadablePlugin({
                filename:  dirs.stats,
            }),
        ],
        optimization: {
            removeAvailableModules: false,
            removeEmptyChunks: false,
            splitChunks: false,
        },
        stats: {
            colors: true,
            modules: false,
            version: false,
            hash: false
        },
    }
}