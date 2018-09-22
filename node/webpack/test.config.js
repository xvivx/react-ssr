import path from 'path';
import webpack from 'webpack';
import dirs from '../config/index';

export default {
    name: 'server',
    entry: [path.resolve(dirs.client, 'test.js')],
    output: {
        path: path.resolve(dirs.deploy, 'server'),
        filename: 'server.js',
        libraryTarget: 'commonjs2',
        publicPath: dirs.publicPath
    },
    mode: 'development',
    target: 'node',
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
                            ]
                        }
                    }
                ]
            },
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    stats: {
        colors: true,
        timings: true
    },
    node: {
        console: false,
        global: false,
        process: false,
        Buffer: false,
        __filename: false,
        __dirname: false,
    },
};

