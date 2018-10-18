var webpack = require("webpack")
var path = require("path")
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');

process.noDeprecation = true

module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.join(__dirname, 'dist', 'assets'),
        filename: "bundle.js",
        sourceMapFilename: 'bundle.map'
    },
    devtool: '#source-map',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                loader: 'babel-loader',
                query: {
                    presets: ['env', 'stage-0', 'react']
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader','css-loader', {
                    loader: 'postcss-loader',
                    options: {
                      plugins: () => [require('autoprefixer')]
                    }}]
            },
            {
                test: /\.scss/,
                use: ['style-loader','css-loader', {
                    loader: 'postcss-loader',
                    options: {
                      plugins: () => [require('autoprefixer')]
                    }}, 'sass-loader']
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("production")
            },
            PRODUCTION: JSON.stringify(false),
            VERSION: JSON.stringify("1.0"),
            BROWSER_SUPPORTS_HTML5: true
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: { warnings: false },
            sourceMap: true,
            mangle: true
        }),
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.optimize\.css$/g,
            cssProcessor: require('cssnano'),
            cssProcessorOptions: { discardComments: { removeAll: true } },
            canPrint: true
        }),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: "./index.html",
            "files": {
                "css": ["css/main.css"],
                "js": ["js/head_bundle.js", "js/bundle.js"],
                "img": ["img/"],
                "chunks": {
                    "head": {
                        "entry": "js/head_bundle.js",
                        "css": ["src/css/main.css"]
                    },
                    "main": {
                        "entry": "js/bundle.js"
                    },
                }
            }
        })
    ]
}
