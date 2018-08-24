import path from 'path';
import webpack from 'webpack';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import dirs from '../configs/index';


export default {
    entry: [dirs.clientEntry],
    output: {
        path: dirs.clientOutput,
        publicPath: dirs.publicPath,
        filename: `js/[name].js`,
        pathinfo: true
    },
    mode: 'development',
    name: 'spa',
    target: 'web',
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
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
                                }]
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
        new CleanWebpackPlugin(['build']),
        new HtmlWebpackPlugin({
            title: 'Hello Webpack',
            template: path.resolve(dirs.clientEntry, '../index.html'),
            filename: 'index.html'
        }),
        new webpack.HotModuleReplacementPlugin(),
    ]
}