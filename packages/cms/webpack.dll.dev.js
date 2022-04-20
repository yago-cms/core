const path = require('path');
const { DllPlugin } = require('webpack');
// const glob = require('glob');

// glob('../..//node_modules/@mui/base/**/*.js', {}, (err, files)=>{
//   console.log(files)
// });

module.exports = {
    mode: 'development',
    devtool: 'eval',
    entry: {
        vendor: [
            path.join(__dirname, 'resources', 'js', 'module.js'),
            // path.join(__dirname, 'resources', 'js', 'vendor.js'),
            'react',
            'react-dom',

            'react-router-dom',
            '@apollo/client',
            'graphql',

            '@emotion/cache',
            '@emotion/react',
            '@emotion/styled',
            '@mui/base',


            '@mui/base/className/ClassNameGenerator',
            '@mui/base/composeClasses/composeClasses',
            '@mui/base/generateUtilityClass/generateUtilityClass',
            '@mui/base/generateUtilityClasses/generateUtilityClasses',

            '@mui/base/PopperUnstyled',
            '@mui/base/Portal',
            '@mui/base/TrapFocus',


            '@mui/system',

            '@mui/material',

            '@mui/lab',
            '@mui/x-data-grid',
            '@mui/x-date-pickers',

            '@hookform/resolvers',
            '@hookform/resolvers/yup',

            'yup',
            'react-hook-form',
            '@tinymce/tinymce-react',
            '@fortawesome/fontawesome-svg-core',
            '@fortawesome/pro-duotone-svg-icons',
            '@fortawesome/react-fontawesome',
            '@googlemaps/react-wrapper',
            // 'tinymce',

            'date-fns/format',
            'date-fns/parseISO',

            'prop-types',
            'object-assign',
            'fast-equals',
        ],
    },
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
        path: path.join(__dirname, 'public', 'js'),
        filename: '[name].js',
        library: '[name]'
    },
    plugins: [
        new DllPlugin({
            context: __dirname,
            path: path.join(__dirname, 'public', 'js', '[name]-manifest.json'),
            name: '[name]',
            format: true,
        })
    ]
};