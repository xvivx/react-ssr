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
            filename: '[name].js',
            chunkFilename: 'chunks/[name].js',
            publicPath: dirs.publicPath,
            devtoolModuleFilenameTemplate: info => path.resolve(info.absoluteResourcePath).replace(/\\/g, '/'),
        },
        target: 'web',
        mode: 'production',
        devtool: 'none',
        module: {
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
                    filename: '[name].css',
                    chunkFilename: '[name]-[id].css',
                    hot: true
                }
            ),
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
        ],
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
        stats: {
            colors: true,
            modules: false,
            version: false,
            hash: false
        },
    }
}
