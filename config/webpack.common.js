const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {

    resolve: {
        extensions: ['.ts', '.js']
    },

    plugins: [

        new webpack.optimize.CommonsChunkPlugin({
            name: ['main', 'polyfills']
        }),

        new webpack.LoaderOptionsPlugin({
            options: {
                tslint: {
                    emitErrors: false,
                    failOnHint: false
                }
            }
        }),

        new HtmlWebpackPlugin({
            template: 'src/index.html'
        })

    ],

    module: {
        rules: [
            {
                test: /\.ts$/,
                enforce: 'pre',
                loader: 'tslint-loader',
                options: {
                    configFile: './config/tslint.json'
                }
            },
            { test: /\.html$/, loader: 'raw-loader' }
        ]
    }
};