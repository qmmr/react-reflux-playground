var config = require('./config')
var path = require('path')
var webpack = require('webpack')
var autoprefixer = require('autoprefixer-core')
var csswring = require('csswring')
var nested = require('postcss-nested')
var discardComments = require('postcss-discard-comments')

module.exports = {
	devtool: 'eval-source-map',
	entry: [
		'webpack-dev-server/client?http://' + config.host + ':' + config.port,
		'webpack/hot/only-dev-server',
		'./app/index'
	],
	output: {
		path: path.join(__dirname, 'app'),
		filename: 'bundle.js',
		publicPath: '/app/'
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin()
	],
	resolve: {
		extensions: [ '', '.js', '.jsx' ]
	},
	module: {
		loaders: [
			{ test: /\.js$|\.jsx$/, loaders: [ 'react-hot', 'babel' ], include: path.join(__dirname, 'app') },
			// { test: /\.css$/, loader: 'style!css' },
			{ test: /\.css$/, loader: 'style!css!cssnext!postcss' },
			{ test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url?limit=100000' }
		]
	},
	postcss: [ nested, autoprefixer, discardComments ] // csswring
}
