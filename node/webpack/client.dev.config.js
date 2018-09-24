import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import ExtractCssChunks from 'extract-css-chunks-webpack-plugin';
import { ReactLoadablePlugin } from 'react-loadable/webpack';

import dirs from '../config/index';


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
            publicPath: dirs.publicPath
        },
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
                }
            ]
        },
        plugins: [
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify('development'),
                'process.env.RENDER_TYPE': JSON.stringify(options.type || 'spa')
            }),
            new HtmlWebpackPlugin({
                title: 'Hello Webpack',
                template: path.resolve(dirs.client, 'public/index.html'),
                filename: 'index.html'
            }),
            new webpack.HotModuleReplacementPlugin(),
            new ReactLoadablePlugin({
                filename: dirs.stats,
            }),
            new ExtractCssChunks(
                {
                    filename: "[name].css",
                    chunkFilename: "[id].css",
                    hot: true 
                }
            ),
            new CleanWebpackPlugin(['client'], {
                root: dirs.deploy,
            }),
        ],
        optimization: {
            removeAvailableModules: false,
            removeEmptyChunks: false,
            splitChunks: false,
        },
        // optimization: {
        //     runtimeChunk: 'single',
        //     splitChunks: {
        //         chunks: 'initial',
        //         name: true,
        //         cacheGroups: {
        //             // vendors: {
        //             //     chunks: 'all',
        //             //     test: /[\\/]node_modules[\\/]/,
        //             //     name: true,
        //             // },
        //             styles: {
        //                 name: true,
        //                 test: /\.css$/,
        //                 chunks(chunk) {
        //                     return chunk.name === 'runtime'
        //                 },
        //                 enforce: true
        //             }
        //         },
        //     },
        // },
        stats: {
            colors: true,
            modules: false,
            version: false,
            hash: false
        },
    }
}
