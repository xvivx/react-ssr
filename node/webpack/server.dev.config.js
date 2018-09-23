import path from 'path';
import webpack from 'webpack';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import dirs from '../config/index';
import nodeExternals from 'webpack-node-externals';


export default {
    name: 'server',
    entry: {
        server: [path.resolve(dirs.server, 'index.js')],
    },
    output: {
        path: path.resolve(dirs.deploy, 'server'),
        filename: '[name].js',
        chunkFilename: 'chunks/[name].js',
        libraryTarget: 'commonjs2',
        publicPath: dirs.publicPath
    },
    mode: 'development',
    target: 'node',
    devtool: 'cheap-module-eval-source-map',
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
                                ['react-loadable/babel'],
                            ]
                        }
                    }
                ]
            },
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.BROWSER': false,
        }),
        new webpack.HotModuleReplacementPlugin(),
        new CleanWebpackPlugin(['server', 'stats'], {
            root: dirs.deploy,
        })
    ],
    stats: {
        colors: true,
        timings: true
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

