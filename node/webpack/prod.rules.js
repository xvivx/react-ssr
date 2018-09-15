
export default [
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
];