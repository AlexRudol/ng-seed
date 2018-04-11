const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {

    resolve: {
        extensions: ['.ts', '.js']
    },

    mode: "production",

    plugins: [

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

    optimization: {
        runtimeChunk: "single",
        splitChunks: {
            chunks: "all",
            cacheGroups: {
                vendors: false,
                vendor: {
                    name: "vendor",
                    chunks: "initial"
                }
            }
        },
    },

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