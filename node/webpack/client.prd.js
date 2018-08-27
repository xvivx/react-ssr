import webpack from 'webpack';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import dirs from '../configs/index';
import common from './client.common';


export default {
    ...common,
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
                                    development: true
                                }]
                            ],
                            plugins: [
                                ['@babel/plugin-proposal-class-properties', {
                                    loose: true
                                }],
                                ['syntax-dynamic-import'],
                            ]
                        }
                    }
                ]
            }, {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            }, {
                test: /\.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'less-loader'
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
        ...common.plugins,
        new CleanWebpackPlugin([dirs.clientOutput], {
            root: dirs.root,
        }),
        new webpack.HashedModuleIdsPlugin({
            hashFunction: 'sha256',
            hashDigest: 'hex',
            hashDigestLength: 20
        })
    ],
};