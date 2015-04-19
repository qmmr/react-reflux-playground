var fs = require('fs')
var postcss = require('postcss')
var nested = require('postcss-nested')
var cssnext = require('cssnext')

var input = fs.readFileSync('app/css/main.css', 'utf8')
// console.log('Marcin@postcssify.js:6 :: input', input)
var output = postcss()
	.use(nested())
	.use(cssnext())
	.process(input)

fs.writeFileSync('app/css/output.css', output)
// console.log('Marcin@postcssify.js:12 :: output', output)
