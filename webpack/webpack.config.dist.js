const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');

const app_config = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../config.json')).toString()).DIST;
const { TITLE, CSS_EXTRACT = true } = app_config;

module.exports = {
    mode: 'production',
    entry: {
        index: path.resolve(__dirname, '../src/index.js'),
        vendor: [
            'vue'
        ]
    },
    resolve: {
        extensions: ['.js', '.vue'],
        mainFiles: ['index.js'],
        alias: {
            'vue': 'vue/dist/vue.js'
        }
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'js/bundle-[hash:8].js',  //主js打包文件
        publicPath: '',  //路径从根算起
        chunkFilename: "js/[name]-[chunkHash:8].js"  //如果有需要chunk的文件
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.vue$/,
                exclude: /node_modules/,
                loader: 'vue-loader'
            },
            {
                test: /\.(css|scss)$/,
                use: [
                    CSS_EXTRACT ? MiniCssExtractPlugin.loader : { loader: 'style-loader' },
                    { loader: 'css-loader' },
                    { loader: 'sass-loader' }
                ]
            },
            {
                test: /\.less$/,
                use: [
                    CSS_EXTRACT ? MiniCssExtractPlugin.loader : { loader: 'style-loader' },
                    { loader: 'css-loader' },
                    {
                        loader: 'less-loader',
                        options: {
                            javascriptEnabled: true,
                            modifyVars: {

                            }
                        }
                    },
                    // {
                        // loader: 'style-resources-loader',
                        // options: {
                            // patterns: path.resolve(__dirname, './src/Style/common.less')   //如果需要用一个入口less引入其他的less文件， 开启这一行
                        // }
                    // }
                ]
            },
            {
                test: /\.(png|jpg|gif|ttf|woff|svg|bmp|ico)$/,
                loader: 'url-loader',
                options: {
                    limit: 8192,
                    name: 'static/[name]-[hash:8].[ext]'
                }
            }
        ]
    },
    optimization: {
        splitChunks: {   //代码分割
            cacheGroups: {
                vendor: {  //打包entry.vendor里面提到的第三方库
                    name: "vendor",  //指定名称
                    chunks: "initial",
                    minChunks: 2
                },
                commons: {  //分割公共代码
                    chunks: "initial",
                    minChunks: 2
                }
            }
        }
    },
    plugins: [
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../index.html'),
            title: TITLE,
            filename: 'index.html',
            inject: true
        }),
        new MiniCssExtractPlugin({
            filename: 'style/style-[hash:8].css',
            chunkFilename: "style/[id]-[hash:8].css"
        }),
        new webpack.DefinePlugin({
            APP_MODE: JSON.stringify('PRODUCTION')
        })
    ]
}