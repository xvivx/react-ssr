const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const InserFaviconPlugin = require('./plugins/inserFaviconPlugin.js');
const port = require('./config').port;

const devConfig = {
    devtool: 'cheap-module-source-map',
    entry: path.resolve('app/index.js'),
    output: {
        path: path.resolve('public'),
        publicPath: '/',
        pathinfo: true,
        chunkFilename: '[name].chunk.js',
        filename: 'bundle.js'
    },
    devServer: {
        contentBase: path.resolve(process.cwd(), 'public'),
        inline: true,
        hot: true,
        historyApiFallback: true,
        port: port,
        headers: {
            'Access-Control-Allow-Origin': '*',
        }
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: ['babel-loader'],
                exclude: /node_modules/
            }, {
                test: /\.css$/,
                use: [
                    {
                        loader: 'style-loader'
                    }, {
                        loader: 'css-loader',
                        options: {
                            modules: false,
                            localIdentName: '[name]_[hash:base64:5]'
                        }
                    }, {
                        loader: 'postcss-loader'
                    }
                ]
            }, {
                test: /\.(png|svg|jpe?g|gif)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        limit: 10000,
                        name: '[name].[ext]'
                    }
                }
            }, {
                test: /\.less$/,
                use: ['style-loader','css-loader','less-loader']
            }
        ]
    },
    plugins: [
        new webpack.BannerPlugin('author: idiv'),
        new InserFaviconPlugin(),
        new HtmlWebpackPlugin({
            inject: true,
            template: path.resolve('app/index.html')
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ]
};

module.exports = devConfig;