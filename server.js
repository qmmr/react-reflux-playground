var webpack = require('webpack')
var WebpackDevServer = require('webpack-dev-server')
var webpackConfig = require('./webpack.config')
var config = require('./config')

new WebpackDevServer(webpack(webpackConfig), {
	contentBase: 'app',
	publicPath: webpackConfig.output.publicPath,
	hot: true,
	historyApiFallback: true
}).listen(config.port, config.host, function (err, result) {
	if (err) {
		console.log(err)
	}

	console.log('WebpackDevServer is listening at ' + config.host + ':' + config.port)
})
