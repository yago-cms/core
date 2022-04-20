const path = require('path');
const { DllReferencePlugin } = require('webpack');

module.exports = {
    entry: path.join(__dirname, 'resources', 'js', 'index.js'),
    mode: 'production',
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.?js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env',
                            [
                                '@babel/preset-react',
                                { runtime: 'automatic' }
                            ]
                        ]
                    }
                }
            },
        ]
    },
    output: {
        filename: '[name].min.js',
        path: path.resolve(__dirname, 'public', 'js'),
    },
    plugins: [
        new DllReferencePlugin({
            context: path.resolve(__dirname, '..', 'cms'),
            manifest: require('../cms/public/js/vendor-manifest.json')
        }),
    ]
};