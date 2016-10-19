var LiveReloadPlugin = require('webpack-livereload-plugin');
var CommonsChunkPlugin = require('./node_modules/webpack/lib/optimize/CommonsChunkPlugin');

module.exports = {
        entry: {
            app: './src/index.jsx',
            vendor: ['babel-polyfill',
                    'react',
                    'mobx',
                    'mobx-react',
                    'axios',
                    'semantic-ui-react',
                    'moment',
                    'react-dom',
                    'domurl',
                    'react-datepicker'
                ],
        },
        output: {
            path: __dirname,
            publicPath: '/',
            filename: './dist/bundle.js',
            sourceMapFilename: './dist/bundle.map'
        },
        module: {
            loaders: [{
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    plugins: ['transform-runtime', 'transform-decorators-legacy'],
                    presets: ['es2015', 'stage-0', 'react']
                }
            },
            {
                test: /\.scss$/,
                loaders: ['style', 'css', 'sass']
            },
            {
                test: /\.css$/,
                loaders: ['style', 'css']
            }]
        },
        resolve: {
            extensions: ['', '.js', '.jsx']
        },
        devServer: {
            historyApiFallback: true,
            contentBase: './dist',
        },
    devtool: 'source-map',
    plugins: [
      new CommonsChunkPlugin({
        name: 'vendor',
        filename: './dist/commons.js',
        minChunks: 0,
        sourceMapFilename: './dist/commons.map'
      })
    ]
};
