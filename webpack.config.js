var config = require('./config')
var path = require('path')
var webpack = require('webpack')

module.exports = {
	devtool: 'eval',
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
			{ test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000', include: path.join(__dirname, 'app') }
		]
	}
}
