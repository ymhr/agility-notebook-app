var LiveReloadPlugin = require('webpack-livereload-plugin');
var CommonsChunkPlugin = require('./node_modules/webpack/lib/optimize/CommonsChunkPlugin');
var DefinePlugin = require('./node_modules/webpack/lib/DefinePlugin');
// var DashboardPlugin = require('webpack-dashboard/plugin');
var path = require('path');

module.exports = {
	entry: {
		vendor: ['babel-polyfill',
			'react',
			'mobx',
			'mobx-react',
			'axios',
			'semantic-ui-react',
			'moment',
			'react-dom',
			'domurl',
			'react-datepicker',
		],
		app: ['./src/index.jsx']
	},
	output: {
		path: __dirname,
		publicPath: '/',
		filename: './dist/bundle.js',
		sourceMapFilename: './dist/bundle.map'
	},
	module: {
		rules: [{
			exclude: /node_modules/,
			loader: 'babel-loader',
			query: {
				plugins: ['transform-runtime', 'transform-decorators-legacy', 'react-hot-loader/babel'],
				presets: ['es2015', 'stage-0', 'react']
			}
		},
		{
			test: /\.scss$/,
			use: ['style-loader', 'css-loader', 'sass-loader']
		},
		{
			test: /\.css$/,
			use: ['style-loader', 'css-loader']
		},
		{
			test: /\.jsx$/,
			exclude: /node_modules/,
			use: [
				{
					loader: "babel-loader",
					options: {
						plugins: ['transform-runtime', 'transform-decorators-legacy', 'react-hot-loader/babel'],
						presets: [['es2015', {"modules": false}], "react", "stage-0"]

					}
				}
			]
		}]
	},
	resolve: {
		modules: [
			path.resolve('./src'),
			"node_modules"
		],
		extensions: ['.js', '.jsx']
	},
	 devServer: {
 		historyApiFallback: true,
 		contentBase: './dist/',
	 	publicPath: '/',
	 	inline: true
 	},
	devtool: 'eval',
	plugins: [
		// new DashboardPlugin(),
		new CommonsChunkPlugin({
			name: 'vendor',
			filename: './dist/commons.js',
			minChunks: 0
		}),
		new DefinePlugin({
			API_URL: JSON.stringify(process.env.API_URL || "http://localhost:8080")
		})
	]
};
