import path from 'path';
import webpack from 'webpack';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import dirs from '../configs/index';

var dllOptions = {
    name: '[name]_library',
    path: path.resolve(dirs.dll, '[name]-manifest.json'),
    context: __dirname
};

export default {
    entry: {
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
        path: dirs.dll,
        filename: '[name].dll.js',
        library: dllOptions.name
    },
    mode: 'production',
    module: {
        strictExportPresence: true,
        rules: [
            {
                test: /jsx?$/,
                sideEffects: false,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            babelrc: false,
                            presets: [
                                ['@babel/preset-react', {
                                    useBuiltIns: true,
                                    development: false
                                }]
                            ],
                            plugins: [
                                ['@babel/plugin-proposal-class-properties', {
                                    loose: true
                                }],
                            ]
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin([dirs.dll], {
            root: dirs.clientOutput,
        }),
        new webpack.DllPlugin(dllOptions),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new webpack.HashedModuleIdsPlugin({
            hashFunction: 'sha256',
            hashDigest: 'hex',
            hashDigestLength: 5
        }),
    ],
    target: 'web'
};