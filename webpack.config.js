var DefinePlugin = require('./node_modules/webpack/lib/DefinePlugin');
var path = require('path');
var ManifestPlugin = require('webpack-manifest-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: {
		vendor: [
			'babel-polyfill',
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
		// publicPath: '/dist',
		filename: '[name].js',
		path: path.join(__dirname, 'dist')
	},
	module: {
		rules: [{
			exclude: /node_modules/,
			test: /\.js$/,
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
 		contentBase: path.join(__dirname, 'dist'),
	 	publicPath: '/',
		inline: true,
		hot: true,
		overlay: true
 	},
	devtool: 'cheap-module-source-map',
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/index.html'
		}),
		new DefinePlugin({
			API_URL: JSON.stringify(process.env.API_URL || "http://localhost:3000")
		}),
		//need to make this output to crrect dir
		new ManifestPlugin({
			fileName: 'manifest.json',
			// publicPath: '/dist/',
			writeToFileEmit: true,
			seed: {
				"name": "Agility Notebook",
				"short_name": "Notebook",
				"lang": "en-GB",
				"start_url": "/",
				"display": "standalone",
				"theme_color": "#cccccc",
				"icons": [
					{
					"src": "images/icons/icon-72x72.png",
					"sizes": "72x72",
					"type": "image/png"
					},
					{
					"src": "images/icons/icon-96x96.png",
					"sizes": "96x96",
					"type": "image/png"
					},
					{
					"src": "images/icons/icon-128x128.png",
					"sizes": "128x128",
					"type": "image/png"
					},
					{
					"src": "images/icons/icon-144x144.png",
					"sizes": "144x144",
					"type": "image/png"
					},
					{
					"src": "images/icons/icon-152x152.png",
					"sizes": "152x152",
					"type": "image/png"
					},
					{
					"src": "images/icons/icon-192x192.png",
					"sizes": "192x192",
					"type": "image/png"
					},
					{
					"src": "images/icons/icon-384x384.png",
					"sizes": "384x384",
					"type": "image/png"
					},
					{
					"src": "images/icons/icon-512x512.png",
					"sizes": "512x512",
					"type": "image/png"
					}
				],
			"splash_pages": null
			}
		})
	]
};