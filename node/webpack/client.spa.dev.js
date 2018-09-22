import path from 'path';
import dirs from '../config/index';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';

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
            path: path.resolve(dirs.deploy, '/client'),
            filename: '[name].js',
            chunkFilename: 'chunks/[name].[chunkhash:5].js',
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
                                ]
                            }
                        }
                    ]
                }
            ]
        },
        plugins: [
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify('development'),
                'process.env.type': JSON.stringify(options.type || 'spa')
            }),
            new HtmlWebpackPlugin({
                title: 'Hello Webpack',
                template: path.resolve(dirs.client, 'public/index.html'),
                filename: 'index.html'
            }),
            new webpack.HotModuleReplacementPlugin()
        ],
        optimization: {
            removeAvailableModules: false,
            removeEmptyChunks: false,
            splitChunks: false,
        },
        stats: {
            colors: true,
            modules: false,
            version: false,
            hash: false
        },
    }
}