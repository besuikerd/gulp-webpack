var path = require('path');
var webpack = require('webpack-stream').webpack;
var src = require('./src');
var fs = require('fs');
var path = require('path')
var R = require('ramda');

var ExtractTextPlugin = require('extract-text-webpack-plugin');

var babelConfig = JSON.parse(fs.readFileSync(path.join(__dirname, '../../.babelrc')));

var projectRoot = path.join(__dirname, '../..');


var entries = R.map(example => `${example}/js/app.js`, require('./examples'));
entries['main'] = `./${src.jsMain}`;

module.exports = {

    context: projectRoot,
    cache: true,
    entry: entries,
    output: {
        path: path.join(__dirname + '/../..', src.dist),
        publicPath: 'dist/',
        filename: '[name].js',
        chunkFilename: '[chunkhash].js'
    },
    module: {
        loaders: [
            {test: /\.css$/,    loader: ExtractTextPlugin.extract('style-loader', 'css')},
            {test: /\.scss$/i, loader: ExtractTextPlugin.extract('style-loader', ['css','sass'])},
            {test: /\.less$/i, loader: ExtractTextPlugin.extract('style-loader', ['css','less'])},
            {test: /\.json$/, loader: 'json-loader'},

            //elm loader
            {
              test: /\.elm$/,
              exclude: [/elm-stuff/, /node_modules/],
              loader: 'elm-webpack'
            },

            //bootstrap assets
            {test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000' },

            // required for babel
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel', // 'babel-loader' is also a legal name to reference
                query: babelConfig
            }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            // Automatically detect jQuery and $ as free var in modules
            // and inject the jquery library
            // This is required by many jquery plugins
            jQuery: 'jquery',
            $: 'jquery',
            _: 'lodash'
        }),

        new ExtractTextPlugin('stylesheets/[name].css'),
    ]
};
