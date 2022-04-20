const path = require('path');
const { DllPlugin } = require('webpack');

module.exports = {
    mode: 'development',
    devtool: 'eval',
    entry: {
        vendor: [
            path.join(__dirname, 'resources', 'js', 'module.js'),
            'react',
            'react-dom',
            'react-router-dom',
            '@apollo/client',
            'graphql',
            '@emotion/react',
            '@emotion/styled',
            '@mui/base',
            '@mui/system',
            '@mui/material',
            '@mui/lab',
            '@mui/x-data-grid',
            '@mui/x-date-pickers',
            '@hookform/resolvers',
            'yup',
            'react-hook-form',
            '@tinymce/tinymce-react',
            '@fortawesome/fontawesome-svg-core',
            '@fortawesome/pro-duotone-svg-icons',
            '@fortawesome/react-fontawesome',
            '@googlemaps/react-wrapper',
            'tinymce',
        ],
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