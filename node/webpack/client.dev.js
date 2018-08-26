import webpack from 'webpack';
import common from './client.common';
import dirs from '../configs/index';


export default {
    ...common,
    output: {
        path: dirs.clientOutput,
        publicPath: dirs.publicPath,
        filename: `js/[name].js`,
        chunkFilename: 'js/chunks/chunks[name].js',
        pathinfo: true
    },
    mode: 'development',
    name: 'client',
    devtool: 'cheap-module-source-map',
    module: {
        strictExportPresence: true,
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            babelrc: false,
                            cacheDirectory: true,
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
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development')
        }),
        new webpack.HotModuleReplacementPlugin(),
    ]
}