import path from 'path';
import webpack from 'webpack';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import nodeExternals from 'webpack-node-externals';

import dirs from '../config/index';
import { env } from '../utils/env';

var isDev = env('development');

export default {
    name: 'server',
    entry: {
        server: [path.resolve(dirs.server, isDev ? 'index.js' : 'index.prd.js')],
    },
    cache: isDev,
    output: {
        path: path.resolve(dirs.deploy, 'server'),
        filename: '[name].js',
        chunkFilename: 'chunks/[name].js',
        libraryTarget: 'commonjs2',
        publicPath: dirs.publicPath,
        devtoolModuleFilenameTemplate: info => path.resolve(info.absoluteResourcePath).replace(/\\/g, '/'),
    },
    context: dirs.server,
    mode: 'development',
    target: 'node',
    devtool: isDev ? 'cheap-module-eval-source-map' : 'source-map',
    module: {
        strictExportPresence: true,
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
                test: /\.(c|le)ss$/,
                use: [
                    'null-loader'
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
            'process.env.BROWSER': false,
        }),
        new CleanWebpackPlugin(['server'], {
            root: dirs.deploy,
        }),
        ...(isDev ? [new webpack.HotModuleReplacementPlugin()] : [])
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
    externals: [
        nodeExternals()
    ],
    node: {
        console: false,
        global: false,
        process: false,
        Buffer: false,
        __filename: false,
        __dirname: false,
    },
};

