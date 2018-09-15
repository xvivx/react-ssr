import webpack from 'webpack';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import AddAssetHtmlPlugin from 'add-asset-html-webpack-plugin';
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
        ...common.plugins,
        new CleanWebpackPlugin([dirs.clientOutput], {
            root: dirs.root,
            exclude: ['dll']
        }),
        new webpack.HashedModuleIdsPlugin({
            hashFunction: 'sha256',
            hashDigest: 'hex',
            hashDigestLength: 20
        }),
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require(dirs.dll + '/vendors-manifest.json')
        }),
        new AddAssetHtmlPlugin({
            filepath: dirs.dll + '/vendors.dll.js',
            hash: true,
            includeSourcemap: false,
            publicPath: dirs.publicPath
        }),
    ],
};