import path from 'path';
import fs from 'fs';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import WebpackAssetsManifest from 'webpack-assets-manifest';
import dirs from '../configs/index';
import { env } from '../utils';

var isDev = env('development');

export default {
    mode: isDev ? 'development' : 'production',
    entry: {
        // 开发模式下启用热更新
        app: (isDev ? [`webpack-hot-middleware/client`] : []).concat(dirs.clientEntry),
        vendors: [
            'react',
            'react-dom',
            'react-router',
            'react-router-dom',
            'redux',
            'redux-thunk',
            'react-redux'
        ]
    },
    output: {
        path: dirs.clientOutput,
        publicPath: dirs.publicPath,
        filename: `${isDev ? '[name]' : 'js/[name].[chunkhash:8]'}.js`,
        chunkFilename: `${isDev ? '[name].chunk' : 'js/chunks/[name].[chunkhash:8]'}.js`,
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Hello Webpack',
            template: path.resolve(dirs.clientEntry, '../index.html'),
            filename: 'index.html'
        }),
        new WebpackAssetsManifest({
            output: `${dirs.clientOutput}/asset-manifest.json`,
            publicPath: true,
            writeToDisk: true,
            customize: ({ key, value }) => {
                if (key.toLowerCase().endsWith('.map')) return false;
                return { key, value };
            },
            done: (manifest, stats) => {
                // chunk-manifest.json.json
                var chunkFileName = `${dirs.clientOutput}/chunk-manifest.json`;
                try {
                    var fileFilter = file => !file.endsWith('.map');
                    var addPath = file => manifest.getPublicPath(file);
                    var chunkFiles = stats.compilation.chunkGroups.reduce((acc, c) => {
                        acc[c.name] = [
                            ...(acc[c.name] || []),
                            ...c.chunks.reduce(
                                (files, cc) => [
                                    ...files,
                                    ...cc.files.filter(fileFilter).map(addPath),
                                ],
                                [],
                            ),
                        ];
                        return acc;
                    }, Object.create(null));

                    fs.writeFileSync(chunkFileName, JSON.stringify(chunkFiles, null, 2));
                } catch (err) {
                    console.error(`ERROR: Cannot write ${chunkFileName}: `, err);
                    if (!isDev) process.exit(1);
                }
            },
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
    target: 'web',
};