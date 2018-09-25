import path from 'path';
import webpack from 'webpack';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import dirs from '../config/index';

var dllOptions = {
    name: '[name]_library',
    path: path.resolve(dirs.deploy, 'dll/[name]-manifest.json'),
    context: __dirname
};

export default {
    entry: {
        vendors: [
            'react',
            'react-dom',
            'react-router',
            'react-router-dom',
        ]
    },
    output: {
        path: path.resolve(dirs.deploy, 'dll'),
        filename: '[name].dll.js',
        library: dllOptions.name,
        devtoolModuleFilenameTemplate: info => path.resolve(info.absoluteResourcePath).replace(/\\/g, '/'),
    },
    mode: 'production',
    devtool: 'none',
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
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['dll'], {
            root: dirs.deploy,
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
    target: 'web',
    stats: {
        colors: true,
        timings: true,
        reasons: false,
        cachedAssets: false
    },
};