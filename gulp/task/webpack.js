var gulp = require('gulp');
var gutil = require('gulp-util');
var webpackStream = require('webpack-stream');
var webpack = webpackStream.webpack;
var webpackConf = require('../conf/webpack');
var WebpackDevServer = require('webpack-dev-server');
var R = require('ramda');
var src = require('../conf/src');
var R = require('ramda');
var examples = R.values(require('../conf/examples'));


gulp.task('webpack:build', build(webpackConf));
function build(conf){
    return function(){

        var exampleIndexes = examples.map(example => `${example}/index.html`);
        gulp.src(exampleIndexes, {base: './examples'})
          .pipe(gulp.dest(src.dist + '/examples'))

        conf = R.clone(conf);
        conf.plugins = conf.plugins.concat(
          new webpack.DefinePlugin({
              "process.env": {
                  // This has effect on the react lib size
                  "NODE_ENV": JSON.stringify("production")
              }
          }),
          new webpack.optimize.DedupePlugin(),
          new webpack.optimize.UglifyJsPlugin()
        );

        return gulp.src(src.jsMain)
          .pipe(webpackStream(conf))
          .pipe(gulp.dest(src.dist + '/dist'));
    };
}

gulp.task ('webpack:build-dev', buildDev(webpackConf));
function buildDev(conf){
    return function(){
        conf = R.clone(conf);
        conf.devtool = 'source-map';
        conf.plugins = conf.plugins.concat(
          new webpack.DefinePlugin({
              "process.env": {
                  // This has effect on the react lib size
                  "NODE_ENV": JSON.stringify("development")
              }
          })
          //new webpack.optimize.DedupePlugin(),
          //new webpack.optimize.UglifyJsPlugin()
        );


        return gulp.src(src.jsMain)
          .pipe(webpackStream(conf))
          .pipe(gulp.dest(src.dist));
    }
}

gulp.task('webpack:dev', dev(webpackConf));
function dev(conf){
    return function(){
        conf = R.clone(conf);
        conf.devtool = 'source-map';
        conf.debug = true;
        var port = conf.port || 3000;
        var host = '0.0.0.0';

        // Start a webpack-dev-server
        new WebpackDevServer(webpack(conf), {
            publicPath: '/' + conf.output.publicPath,
            stats: {
                colors: true
            },
            proxy: conf.devServer && conf.devServer.proxy || {}
        }).listen(port, host, function(err) {
            if(err) throw new gutil.PluginError('webpack-dev-server', err);
            gutil.log('[webpack-dev-server]', `http://${host}:${port}/webpack-dev-server/index.html`);
        });
    }
}

module.exports = {
    build: build,
    dev: dev
}
