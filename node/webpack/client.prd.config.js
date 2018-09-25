import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import ExtractCssChunks from 'extract-css-chunks-webpack-plugin';
import { ReactLoadablePlugin } from 'react-loadable/webpack';
import AddAssetHtmlPlugin from 'add-asset-html-webpack-plugin';

import dirs from '../config/index';

var presetEnv = {
    targets: {
        browsers: [
            ">1%",
            "last 4 versions",
            "Firefox ESR",
            "not ie < 9"
        ],
    },
    forceAllTransforms: true,
    modules: false,
    useBuiltIns: false,
    debug: false,
};

export default (options) => {
    return {
        name: 'client',
        entry: {
            client: [
                path.resolve(dirs.client, 'index.js')
            ]
        },
        output: {
            path: path.resolve(dirs.deploy, 'client'),
            filename: '[name].[chunkhash:5].js',
            chunkFilename: 'chunks/[name].[chunkhash:5].js',
            publicPath: dirs.publicPath,
            devtoolModuleFilenameTemplate: info => path.resolve(info.absoluteResourcePath).replace(/\\/g, '/'),
        },
        mode: 'production',
        target: 'web',
        devtool: 'none',
        context: dirs.root,
        module: {
            strictExportPresence: true,
            rules: [
                {
                    test: /\.jsx?$/,
                    use: [
                        {
                            loader: 'babel-loader',
                            options: {
                                babelrc: false,
                                presets: [
                                    ['@babel/preset-env', presetEnv],
                                    ['@babel/preset-react']
                                ],
                                plugins: [
                                    ['syntax-dynamic-import'],
                                ]
                            }
                        }
                    ]
                }, {
                    test: /\.less$/,
                    use: [
                        ExtractCssChunks.loader,
                        {
                            loader: 'css-loader',
                            options: {
                                modules: true,
                                importLoaders: 1,
                                localIdentName: '[name]__[local]--[hash:base64:5]'
                            }
                        },
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
                'process.env.NODE_ENV': JSON.stringify('production'),
                'process.env.RENDER_TYPE': JSON.stringify(options.type || 'spa')
            }),
            new HtmlWebpackPlugin({
                title: 'REACT SSR',
                template: path.resolve(dirs.public, 'index.html'),
                filename: 'index.html'
            }),
            new ExtractCssChunks({
                filename: 'css/[name].css',
                chunkFilename: 'css/[name].[chunkhash:5].css',
            }),
            new CleanWebpackPlugin(['client'], {
                root: dirs.deploy,
            }),
            new webpack.DllReferencePlugin({
                context: __dirname,
                manifest: require(dirs.deploy + '/dll/vendors-manifest.json')
            }),
            new AddAssetHtmlPlugin({
                filepath: path.resolve(dirs.deploy, 'dll/vendors.dll.js'),
                hash: true,
                includeSourcemap: false,
                publicPath: dirs.publicPath
            }),
            new webpack.HashedModuleIdsPlugin({
                hashFunction: 'sha256',
                hashDigest: 'hex',
                hashDigestLength: 5
            }),
            ...(options.type === 'ssr' ? [new ReactLoadablePlugin({
                filename: dirs.stats,
            })] : []),
        ],
        optimization: {
            runtimeChunk: 'single',
            splitChunks: {
                chunks: 'all',
                cacheGroups: {
                    node_modules: {
                        chunks: 'all',
                        test: /[\\/]node_modules[\\/]/,
                        name: 'commons',
                    },
                },
            },
        },
        stats: {
            colors: true,
            modules: false,
            version: false,
            hash: false
        },
    }
}
