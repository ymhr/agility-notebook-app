var LiveReloadPlugin = require('webpack-livereload-plugin');
var CommonsChunkPlugin = require('./node_modules/webpack/lib/optimize/CommonsChunkPlugin');
var DefinePlugin = require('./node_modules/webpack/lib/DefinePlugin');
// var DashboardPlugin = require('webpack-dashboard/plugin');
var path = require('path');
var ManifestPlugin = require('webpack-manifest-plugin');

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
			test: /\.css$/,
			use: [
				'style-loader',
				{ loader: 'css-loader', options: { modules: true, importLoaders: 1 } },
				'postcss-loader'
			]
		},
		{
			test: /\.jsx$/,
			exclude: /node_modules/,
			use: [
				{
					loader: "babel-loader",
					options: {
						plugins: ['transform-runtime', 'transform-decorators-legacy', 'react-hot-loader/babel', 'transform-do-expressions'],
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
	devtool: 'eval-source-map',
	plugins: [
		// new DashboardPlugin(),
		new CommonsChunkPlugin({
			name: 'vendor',
			filename: './dist/commons.js',
			minChunks: 0
		}),
		new DefinePlugin({
			API_URL: JSON.stringify(process.env.API_URL || "http://localhost:3000")
		}),
		//need to make this output to crrect dir
		new ManifestPlugin({
			fileName: 'manifest.json',
			publicPath: '/dist/',
			writeToFileEmit: true,
			seed: {
				"name": "Agility Notebook",
				"short_name": "Notebook",
				"lang": "en-GB",
				"start_url": "/",
				"display": "standalone",
				"theme_color": "#cccccc"
			}
		})
	]
};