const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common');
const CompressionPlugin = require('compression-webpack-plugin');
const ngtools = require('@ngtools/webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeJsPlugin = require('optimize-js-plugin');
const path = require('path');


module.exports = webpackMerge( commonConfig, {

    entry: {
        'polyfills': './src/polyfills.ts',
        'main': './src/main.aot.ts'
    },

    output: {
        path: path.resolve(__dirname, '../dist'),
        publicPath: '.',
        filename: '[name].js',
        chunkFilename: 'chunks/[id].chunk.js'
    },

    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),

        new OptimizeJsPlugin({
            sourceMap: false
        }),

        new UglifyJsPlugin({
            uglifyOptions: {
                ie8: false,
                ecma: 6,
                warnings: false,
                mangle: true,
                output: {
                    comments: false,
                    beautify: false
                }
            }
        }),

        new webpack.LoaderOptionsPlugin({
            options: {
                htmlLoader: {
                    minimize: true
                }
            }
        }),

        new ngtools.AotPlugin({
            tsConfigPath: './tsconfig-aot.json',
            entryModule: path.resolve(__dirname, '../src','app','app.module')+'#AppModule'
        }),

        new CompressionPlugin({
            regExp: /\.css$|\.html$|\.js$|\.map$/,
            threshold: 2 * 1024
        })
    ],

    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: [/\.(spec|e2e)\.ts$/],
                use: ['@ngtools/webpack']
            }
        ]
    }
});
