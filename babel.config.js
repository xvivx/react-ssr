module.exports = {
    presets: [
        [
            '@babel/preset-env', 
            {
                targets: {
                    node: 'current'
                }
            }
        ], [
            '@babel/preset-react', {}
        ]
    ],
    plugins: [  
        'syntax-dynamic-import',
        'react-loadable/babel'
    ],
    ignore: ['node_modules', 'deploy'],
};