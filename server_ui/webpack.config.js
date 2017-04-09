var HTMLWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');

var HTMLWebpackPluginConfig = new HTMLWebpackPlugin({
    template: __dirname + '/app/index.html',
    filename: 'index.html',
    inject: 'body'
});

var UglifyJSPluginConfig = new webpack.optimize.UglifyJsPlugin({
    compress: {
        warnings: false
    },
    output: {
        comments: false
    }
});


module.exports = {
    entry: ['babel-polyfill', __dirname + '/app/index.js'],
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: [/node_modules/, /oldComponents/],
                loader: 'babel-loader'
            },
            {
                test: /\.json$/,
                loader: 'json-loader'
            }
        ]
    },
    output: {
        filename: 'bundle.js',
        path: __dirname + '/app/public'
    },
    plugins: [HTMLWebpackPluginConfig]
};
