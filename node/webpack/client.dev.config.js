import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import ExtractCssChunks from 'extract-css-chunks-webpack-plugin';
import { ReactLoadablePlugin } from 'react-loadable/webpack';

import dirs from '../config/index';
import { env } from '../utils/env';


var isDev = env('development');

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
            publicPath: dirs.publicPath,
            devtoolModuleFilenameTemplate: info => path.resolve(info.absoluteResourcePath).replace(/\\/g, '/'),
        },
        cache: true,
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
                                    'syntax-dynamic-import',
                                    'react-loadable/babel'
                                ]
                            }
                        }
                    ]
                }, {
                    test: /\.less$/,
                    use: [
                        ExtractCssChunks.loader,
                        'css-loader',
                        'less-loader'
                    ]
                }, {
                    test: /\.css$/,
                    use: [
                        ExtractCssChunks.loader,
                        'css-loader'
                    ]
                }, {
                    test: /\.(jpg|png|gif|jpeg)$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: 'assets/[name].[ext]'
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
                title: 'REACT SSR',
                template: path.resolve(dirs.client, 'public/index.html'),
                filename: 'index.html'
            }),
            new webpack.HotModuleReplacementPlugin(),
            new ReactLoadablePlugin({
                filename: dirs.stats,
            }),
            new ExtractCssChunks(
                {
                    filename: 'css/[name].css',
                    chunkFilename: 'css/[name].[hash:5].css',
                    hot: true 
                }
            ),
        ],
        optimization: {
            removeAvailableModules: false,
            removeEmptyChunks: false,
            splitChunks: false,
        },
        stats: {
            colors: true,
            timings: isDev,
            exclude: /node_modules/,
            builtAt: false,
            context: dirs.server,
            modules: false,
            reasons: isDev,
            cachedAssets: isDev
        },
    }
}
